sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.addstudent", {
		onInit: function() {
			var myRoute = this.getOwnerComponent().getRouter().getRoute("addstudent"); //route name
			myRoute.attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(event) {
			var max, val, status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			window.console.log("enter get");
			oModel.read("/ZNS_STUDENTSet?$orderby=Sid desc", {
				context: null,
				urlParameters: {
					"$select": "Sid"
				},
				async: false,
				success: function(oData, oResponse) {
					val = parseInt(oData.results[0].Sid);
					max = val + 1;
					status = 1;
					//window.console.log(max);
					MessageBox.information("Data Successfully Retrieving");
				},
				error: function(oData) {
					MessageBox.information("Error in Data Retrieving");
				}
			});
			this.getView().byId("sid").setValue(max);
		},
		onChange: function() {
			var selectedText = this.byId("sbox").getSelectedItem().getText();
			var selectedKey = this.byId("sbox").getSelectedItem().getKey();
			return selectedText; // passing values inside this controller.js

		},
		onGet: function() {
			var stuid = this.getView().byId("sid").getValue();
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
		onAdd: function() {
			var stuid = this.getView().byId("sid").getValue();
			var sname = this.getView().byId("sname").getValue();
			var sdob = this.getView().byId("sdob").getValue();
			var sdeg = this.getView().byId("sdeg").getValue();
			var sdept = this.onChange();
			var syear = this.getView().byId("syear").getValue();
			var smob = this.getView().byId("smob").getValue();
			var semail = this.getView().byId("semail").getValue();
			sdob = sdob.replace(/\//g, ".");
			var details = {
				"Sid": stuid,
				"Sname": sname,
				"Sdob": sdob,
				"Sdegre": sdeg,
				"Sdept": sdept,
				"Syear": syear,
				"Smob": smob,
				"Semail": semail
			}; // JSON field names should be same as column names in DB table
			window.console.log(details);
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (stuid !== "") {
				window.console.log("enter add");
				oModel.create("/ZNS_STUDENTSet", details, {
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
		onUpdate:function(){
			var stuid = this.getView().byId("sid").getValue();
			var sname = this.getView().byId("sname").getValue();
			var sdob = this.getView().byId("sdob").getValue();
			var sdeg = this.getView().byId("sdeg").getValue();
			var sdept = this.onChange();
			var syear = this.getView().byId("syear").getValue();
			var smob = this.getView().byId("smob").getValue();
			var semail = this.getView().byId("semail").getValue();
			sdob = sdob.replace(/\//g, ".");
			var details = {
				"Sid": stuid,
				"Sname": sname,
				"Sdob": sdob,
				"Sdegre": sdeg,
				"Sdept": sdept,
				"Syear": syear,
				"Smob": smob,
				"Semail": semail
			}; // JSON field names should be same as column names in DB table
			window.console.log(details);
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (stuid !== "") {
				window.console.log("enter update");
				oModel.update("/ZNS_STUDENTSet('" + stuid + "')", details, {
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
				/*   or var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true);
				        oModel.create("/ZNS_FACULTYSet", details); */
			} else {
				MessageBox.information("Error in Data Updating");
			}
		},
		onDelete: function() {
			var stuid = this.getView().byId("sid").getValue();
			var status = 0;
			var surl = "/sap/opu/odata/sap/ZNS_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			if (stuid !== "") {
				window.console.log("enter delete");
				oModel.remove("/ZNS_STUDENTSet('" + stuid + "')", {
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
			this.getView().byId("sid").setValue("");
			this.getView().byId("sname").setValue("");
			this.getView().byId("sdob").setValue("");
			this.getView().byId("sdeg").setValue("");
			this.getView().byId("sbox").setValue("");
			this.getView().byId("syear").setValue("");
			this.getView().byId("smob").setValue("");
			this.getView().byId("semail").setValue("");

		},
		onBack: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("admin");
		}
	});
});