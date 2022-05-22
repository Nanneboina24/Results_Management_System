sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.fprofile", {
		onInit: function() {
			var myRoute = this.getOwnerComponent().getRouter().getRoute("fprofile"); //route name
			myRoute.attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(event) {
			var facid = $.sap.myId;
			var fid, fname, fdob, fqlf, fdept, fdoj, fmob, femail;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			window.console.log("enter get");
			oModel.read("/ZNS_FACULTYSet('" + facid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					fid = oData["Fid"];
					fname = oData["Fname"];
					fdob = oData["Fdob"];
					fqlf = oData["Fqlf"];
					fdept = oData["Fdept"];
					fdoj = oData["Fdoj"];
					fmob = oData["Fmob"];
					femail = oData["Femail"];
					MessageBox.information("Data Successfully Retrieving");
				},
				error: function(oData) {
					MessageBox.information("Error in Data Retrieving");
				}
			});

			var data = {
				"Fid": fid,
				"Fname": fname,
				"Fdob": fdob,
				"Fqlf": fqlf,
				"Fdept": fdept,
				"Fdoj": fdoj,
				"Fmob": fmob,
				"Femail": femail
			};
			var viewModel = new sap.ui.model.json.JSONModel(data); // creating JSON model with data
			this.getView().setModel(viewModel, "vModel");

		},
		onBack:function(){
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("faculty");
		}

	});
});