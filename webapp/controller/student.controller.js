sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("nanneboinaproj_results.controller.student", {
		onInit: function() {
		},
		onView:function(){
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter1.navTo("viewresults"); 
		},
		onProfile: function() {
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("sprofile");
		},
		onLogout: function() {
			    $.sap.myId = "";
				var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter2.navTo("home"); 
		}
	});
});