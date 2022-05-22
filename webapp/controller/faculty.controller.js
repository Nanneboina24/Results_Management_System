sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.faculty", {
		onInit: function() {},
		onAdd: function() {
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("addresults");
		},
		onProfile: function() {
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("fprofile");
		},
		onLogout: function() {
			$.sap.myId = "";
			var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter2.navTo("home");
		}

	});
});