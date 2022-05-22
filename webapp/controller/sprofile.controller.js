sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.sprofile", {
		onInit: function() {
			var myRoute = this.getOwnerComponent().getRouter().getRoute("sprofile"); //this view route name
			myRoute.attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(event) {
			var stuid = $.sap.myId;
			var sid, sname, sdob, sdeg, sdept, syear, smob, semail;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			window.console.log("enter get");
			oModel.read("/ZNS_STUDENTSet('" + stuid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					sid = oData["Sid"];
					sname = oData["Sname"];
					sdob = oData["Sdob"];
					sdeg = oData["Sdegre"];
					sdept = oData["Sdept"];
					syear = oData["Syear"];
					smob = oData["Smob"];
					semail = oData["Semail"];
					MessageBox.information("Data Successfully Retrieving");
				},
				error: function(oData) {
					MessageBox.information("Error in Data Retrieving");
				}
			});

			var data = {
				"Sid": sid,
				"Sname": sname,
				"Sdob": sdob,
				"Sdeg": sdeg,
				"Sdept": sdept,
				"Syear": syear,
				"Smob": smob,
				"Semail": semail
			};
			var viewModel = new sap.ui.model.json.JSONModel(data); // creating JSON model with data
			this.getView().setModel(viewModel, "vModel");

		},
		onBack:function(){
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("student");
		}

	});
});