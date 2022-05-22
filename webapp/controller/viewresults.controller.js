sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.viewresults", {
		onInit: function() {
			var myRoute = this.getOwnerComponent().getRouter().getRoute("viewresults"); //route name
			myRoute.attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(event) {
			window.console.log("idc", $.sap.myId);
			var stuid = $.sap.myId;
			var sid, msem, msub1, msub2, msub3, msub4, msub5, msub6;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			window.console.log("enter get");
			oModel.read("/ZNS_MARKSSet('" + stuid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
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
				"Sid": sid,
				"Msem": msem.replace(/^0+/, ''),
				"Msub1": msub1.replace(/^0+/, ''),
				"Msub2": msub2.replace(/^0+/, ''),
				"Msub3": msub3.replace(/^0+/, ''),
				"Msub4": msub4.replace(/^0+/, ''),
				"Msub5": msub5.replace(/^0+/, ''),
				"Msub6": msub6.replace(/^0+/, '')
			};
			// transfering data from one controller to another controller through model
			//Controller 1
			// var sampleModel = new sap.ui.model.json.JSONModel(data);
			// sap.ui.getCore().setModel(sampleModel, 'resultsInfo');

			//Controller 2
			// var sModel = sap.ui.getCore().getModel('resultsInfo');
			// var myData = sModel.getData();

			var arr = [];
			var oTableId = this.getView().byId("resTable");
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.setData(arr);
			oTableId.setModel(oModel2);

			var oTab = this.getView().byId("resTable").getModel().getProperty("/");
			oTab.push(data);

			this.getView().byId("resTable").getModel().setProperty("/", oTab);

		},
		onBack: function() {
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("student");
		}

	});
});