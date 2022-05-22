sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.home", {
		onInit: function() {

		},
		onChange: function() {
			var selectedText = this.byId("box").getSelectedItem().getText();
			var selectedKey = this.byId("box").getSelectedItem().getKey();
			// window.console.log(selectedKey);
			// window.console.log(selectedText);
			return selectedText; // passing values inside this controller.js

		},
		onSubmit: function() {
			var userid = this.getView().byId("uid").getValue();
			var pass = this.getView().byId("pwd").getValue();
			window.console.log("user", userid);
			window.console.log("pass", pass);
			var select = this.onChange();
			$.sap.myId = userid; //global variable setting through out the application
			window.console.log("id", $.sap.myId);
			if (select === "Admin" && userid === "0011" && pass === "admin123") {
				this.onClear();
				MessageBox.information("Admin Login Success!");

				var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter1.navTo("admin"); // calling router name and it opens corresponding view page in manifest.json
			} else if (select === "Faculty" && userid !== "" && pass !== "") {
				var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
				var oModel = new sap.ui.model.odata.ODataModel(surl, true);
				var uri = userid;
				var fid, fmob;
				window.console.log(uri);
				oModel.read("/ZNS_FACULTYSet('" + uri + "')", {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {
						window.console.log("this", oData);
						fid = oData["Fid"];
						fmob = oData["Fmob"];

					}
				});
				if (userid === fid && pass === fmob) {
					this.onClear();
					MessageBox.information("Faculty Login Success!");
					var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter2.navTo("faculty");
				} else {
					MessageBox.information("Once Check Your Credentials");
				}
			} else if (select === "Student" && userid !== "" && pass !== "") {
				var surl2 = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
				var oModel2 = new sap.ui.model.odata.ODataModel(surl2, true);
				var uri2 = userid;
				var sid, smob;
				window.console.log(uri2);
				oModel2.read("/ZNS_STUDENTSet('" + uri2 + "')", {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {
						window.console.log("this", oData);
						sid = oData["Sid"];
						smob = oData["Smob"];

					}
				});
				if (userid === sid && pass === smob) {
					this.onClear();
					MessageBox.information("Student Login Success!");
					var oRouter3 = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter3.navTo("student");
				} else {
					MessageBox.information("Once Check Your Credentials");
				}

			} else {
				MessageBox.information("Once Check User Credentials & Fields!");
			}

		},
		onClear: function() {

			this.getView().byId("uid").setValue("");
			this.getView().byId("pwd").setValue("");
			this.getView().byId("box").setValue("");

		}

	});
});