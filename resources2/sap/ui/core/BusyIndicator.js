/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Popup'],function(q,P){"use strict";var B=q.extend(q.sap.newObject(sap.ui.base.EventProvider.prototype),{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1000,sDOM_ID:"sapUiBusyIndicator"});sap.ui.base.EventProvider.apply(B);B.M_EVENTS={Open:"Open",Close:"Close"};B._init=function(){var r=document.createElement("div");r.id=this.sDOM_ID;var i=sap.ui.getCore().getStaticAreaRef();i.appendChild(r);q(r).addClass("sapUiBusy").attr("tabindex",0).attr("role","progressbar").attr("alt","").attr("title","Please Wait");this.oDomRef=r;this.oPopup=new P(r);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false)};B.show=function(d){q.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: "+d+") at "+new Date().getTime());if((d===undefined)||((d!=0)&&(parseInt(d,10)==0))||(parseInt(d,10)<0)){d=this.iDEFAULT_DELAY_MS}this.bOpenRequested=true;if(d===0){this._showNowIfRequested()}else{q.sap.delayedCall(d,this,"_showNowIfRequested")}};B._showNowIfRequested=function(){q.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+new Date().getTime());if(!this.bOpenRequested){return}if(!document.body||!sap.ui.getCore().isInitialized()){q.sap.delayedCall(100,this,"_showNowIfRequested");return}this.bOpenRequested=false;if(!this.oDomRef){this._init()}this.oPopup.open(0,P.Dock.CenterCenter,P.Dock.CenterCenter,document);this.fireOpen({$Busy:this.oPopup._$()});var d=q.sap.domById(B.sDOM_ID);q.sap.focus(d);q("body").attr("aria-busy",true)};B.hide=function(){q.sap.log.debug("sap.ui.core.BusyIndicator.hide at "+new Date().getTime());var t=B;t.bOpenRequested=false;if(t.oDomRef){q("body").removeAttr("aria-busy");this.fireClose({$Busy:this.oPopup._$()});t.oPopup.close(0)}};B.attachOpen=function(f,l){this.attachEvent(B.M_EVENTS.Open,f,l);return this};B.detachOpen=function(f,l){this.detachEvent(B.M_EVENTS.Open,f,l);return this};B.attachClose=function(f,l){this.attachEvent(B.M_EVENTS.Close,f,l);return this};B.detachClose=function(f,l){this.detachEvent(B.M_EVENTS.Close,f,l);return this};B.fireOpen=function(p){this.fireEvent(B.M_EVENTS.Open,p)};B.fireClose=function(p){this.fireEvent(B.M_EVENTS.Close,p)};return B},true);