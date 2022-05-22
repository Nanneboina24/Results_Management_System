sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.addresults", {
		//onInit function trigger only once, if multiple times triggers means have to use attachPatternMatched method
		onInit: function() {
			var myRoute = this.getOwnerComponent().getRouter().getRoute("addresults"); //route name
			myRoute.attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(event) {
			window.console.log("idc", $.sap.myId);
			this.getView().byId("fid").setValue($.sap.myId); // global variable accesing
		},
		onChange: function() {
			var selectedText = this.byId("sbox").getSelectedItem().getText();
			var selectedKey = this.byId("sbox").getSelectedItem().getKey();
			return selectedText; // passing values inside this controller.js

		},
		onGet: function() {
			var stuid = this.getView().byId("sid").getValue();
			var fid,sid, msem, msub1, msub2, msub3, msub4, msub5, msub6;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			window.console.log("enter get");
			oModel.read("/ZNS_MARKSSet('" + stuid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					fid = oData["Fid"];
					sid = oData["Sid"];
					msem = oData["Msem"];
					msub1 = oData["Msub1"];
					msub2 = oData["Msub2"];
					msub3 = oData["Msub3"];
					msub4 = oData["Msub4"];
					msub5 = oData["Msub5"];
					msub6 = oData["Msub6"];
					MessageBox.information("Data Successfully Retrieving");
				},
				error: function(oData) {
					MessageBox.information("Error in Data Retrieving");
				}
			});

			var data = {
				"Fid": fid,
				"Sid": sid,
				"Msem": msem.replace(/^0+/, ''),
				"Msub1": msub1.replace(/^0+/, ''),
				"Msub2": msub2.replace(/^0+/, ''),
				"Msub3": msub3.replace(/^0+/, ''),
				"Msub4": msub4.replace(/^0+/, ''),
				"Msub5": msub5.replace(/^0+/, ''),
				"Msub6": msub6.replace(/^0+/, '')
			};
			var viewModel = new sap.ui.model.json.JSONModel(data); // creating JSON model with data
			this.getView().setModel(viewModel, "vModel");
		},
		onSave: function() {
			var facid = this.getView().byId("fid").getValue();
			var sid = this.getView().byId("sid").getValue();
			var msem = this.onChange();
			var msub1 = this.getView().byId("msub1").getValue();
			var msub2 = this.getView().byId("msub2").getValue();
			var msub3 = this.getView().byId("msub3").getValue();
			var msub4 = this.getView().byId("msub4").getValue();
			var msub5 = this.getView().byId("msub5").getValue();
			var msub6 = this.getView().byId("msub6").getValue();
			var data = {
				"Fid": facid,
				"Sid": sid,
				"Msem": msem,
				"Msub1": msub1,
				"Msub2": msub2,
				"Msub3": msub3,
				"Msub4": msub4,
				"Msub5": msub5,
				"Msub6": msub6
			}; // JSON field names should be same as column names in DB table
			window.console.log(data);
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (sid !== "") {
				window.console.log("enter add");
				oModel.create("/ZNS_MARKSSet", data, {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {
						status = 1;
						MessageBox.information("Data Successfully Added");
					},
					error: function(oData) {
						MessageBox.information("Error in Data Adding");
					}
				});
				if (status === 1) {
					this.onClear();
				}
			} else {
				MessageBox.information("Error in Data Adding");
			}

		},
		onUpdate: function() {
			var facid = this.getView().byId("fid").getValue();
			var sid = this.getView().byId("sid").getValue();
			var msem = this.onChange();
			var msub1 = this.getView().byId("msub1").getValue();
			var msub2 = this.getView().byId("msub2").getValue();
			var msub3 = this.getView().byId("msub3").getValue();
			var msub4 = this.getView().byId("msub4").getValue();
			var msub5 = this.getView().byId("msub5").getValue();
			var msub6 = this.getView().byId("msub6").getValue();
			var data = {
				"Fid": facid,
				"Sid": sid,
				"Msem": msem,
				"Msub1": msub1,
				"Msub2": msub2,
				"Msub3": msub3,
				"Msub4": msub4,
				"Msub5": msub5,
				"Msub6": msub6
			};
			window.console.log(data);
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (sid !== "") {
				window.console.log("enter update");
				oModel.update("/ZNS_MARKSSet('" + sid + "')", data, {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {
						status = 1;
						MessageBox.information("Data Successfully Updated");
					},
					error: function(oData) {
						MessageBox.information("Error in Data Updating");
					}
				});
				if (status === 1) {
					this.onClear();
				}
			} else {
				MessageBox.information("Error in Data Updating");
			}
		},
		onDelete: function() {
			var sid = this.getView().byId("sid").getValue();
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (sid !== "") {
				window.console.log("enter delete");
				oModel.remove("/ZNS_MARKSSet('" + sid + "')", {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {
						status = 1;
						MessageBox.information("Data Successfully Deleted");
					},
					error: function(oData) {
						MessageBox.information("Error in Data Deleting");
					}
				});
				if (status === 1) {
					this.onClear();
				}
			} else {
				MessageBox.information("Error in Data Deleting");
			}

		},
		onClear: function() {
		
			this.getView().byId("fid").setValue("");
			this.getView().byId("sid").setValue("");
			this.getView().byId("sbox").setValue("");
			this.getView().byId("msub1").setValue("");
			this.getView().byId("msub2").setValue("");
			this.getView().byId("msub3").setValue("");
			this.getView().byId("msub4").setValue("");
			this.getView().byId("msub5").setValue("");
			this.getView().byId("msub6").setValue("");
		},
		onBack: function() {
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("faculty");
		}

	});
});