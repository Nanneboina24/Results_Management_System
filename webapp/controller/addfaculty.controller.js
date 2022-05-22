sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter"
], function(Controller, MessageBox, MessageToast, Sorter) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.addfaculty", {
		onInit: function() {
			var myRoute = this.getOwnerComponent().getRouter().getRoute("addfaculty"); //route name
			myRoute.attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(event) {
			var max, val, status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			window.console.log("enter get");
			oModel.read("/ZNS_FACULTYSet?$orderby=Fid desc", {
				context: null,
				// sorters: [
				// 	new Sorter("Fid", /*descending*/ true) // another way of calling orderby
				// ],
				urlParameters: {
					"$select": "Fid"
				},
				async: false,
				success: function(oData, oResponse) {
					// window.console.log(oResponse["statusCode"]);  response from odata service
					// window.console.log(oResponse["statusText"]);
					// window.console.log(oData.results[0]); // getting first row from get_entityset(table)
					// window.console.log(oData.results.length); // getting number of rows
					val = parseInt(oData.results[0].Fid); // accesing first row element(column)
					max = val + 1;
					status = 1;
					//window.console.log(max);
					MessageBox.information("Data Successfully Retrieving");
				},
				error: function(oData) {
					MessageBox.information("Error in Data Retrieving");
				}
			});
			this.getView().byId("fid").setValue(max);
		},
		onChange: function() {
			var selectedText = this.byId("fbox").getSelectedItem().getText();
			var selectedKey = this.byId("fbox").getSelectedItem().getKey();
			return selectedText; // passing values inside this controller.js

		},
		onGet: function() {
			var facid = this.getView().byId("fid").getValue();
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
		onAdd: function() {
			var facid = this.getView().byId("fid").getValue();
			var fname = this.getView().byId("fname").getValue();
			var fdob = this.getView().byId("fdob").getValue();
			var fdoj = this.getView().byId("fdoj").getValue();
			var fqlf = this.getView().byId("fqlf").getValue();
			var fdept = this.onChange();
			var fmob = this.getView().byId("fmob").getValue();
			var femail = this.getView().byId("femail").getValue();
			fdob = fdob.replace(/\//g, ".");
			fdoj = fdoj.replace(/\//g, ".");
			var details = {
				"Fid": facid,
				"Fname": fname,
				"Fdob": fdob,
				"Fdoj": fdoj,
				"Fqlf": fqlf,
				"Fdept": fdept,
				"Fmob": fmob,
				"Femail": femail
			}; // JSON field names should be same as column names in DB table
			window.console.log(details);
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var status = 0;
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (facid !== "") {
				window.console.log("enter add");
				oModel.create("/ZNS_FACULTYSet", details, {
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
				/*   or var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true);
				        oModel.create("/ZNS_FACULTYSet", details); */
			} else {
				MessageBox.information("Error in Data Adding");
			}

		},
		onUpdate: function() {
			var facid = this.getView().byId("fid").getValue();
			var fname = this.getView().byId("fname").getValue();
			var fdob = this.getView().byId("fdob").getValue();
			var fdoj = this.getView().byId("fdoj").getValue();
			var fqlf = this.getView().byId("fqlf").getValue();
			var fdept = this.onChange();
			var fmob = this.getView().byId("fmob").getValue();
			var femail = this.getView().byId("femail").getValue();
			fdob = fdob.replace(/\//g, ".");
			fdoj = fdoj.replace(/\//g, ".");
			var details = {
				"Fid": facid,
				"Fname": fname,
				"Fdob": fdob,
				"Fdoj": fdoj,
				"Fqlf": fqlf,
				"Fdept": fdept,
				"Fmob": fmob,
				"Femail": femail
			};
			window.console.log(details);
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var status = 0;
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (facid !== "") {
				window.console.log("enter update");
				oModel.update("/ZNS_FACULTYSet('" + facid + "')", details, {
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
			var facid = this.getView().byId("fid").getValue();
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (facid !== "") {
				window.console.log("enter delete");
				oModel.remove("/ZNS_FACULTYSet('" + facid + "')", {
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
			this.getView().byId("fname").setValue("");
			this.getView().byId("fdob").setValue("");
			this.getView().byId("fqlf").setValue("");
			this.getView().byId("fdoj").setValue("");
			this.getView().byId("fbox").setValue("");
			this.getView().byId("fmob").setValue("");
			this.getView().byId("femail").setValue("");

		},
		onBack: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("admin");
		}
	});
});