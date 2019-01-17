<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" meta:progid="SharePoint.WebPartPage.Document" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <WebPartPages:AllowFraming runat="server" />
  <SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" /> 
  <SharePoint:ScriptLink name="sp.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  <head><meta charset="utf-8"><link rel="shortcut icon" href="/sites/xplorit_portal/XplorIT/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/sites/xplorit_portal/XplorIT/manifest.json"><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous"><style>.modal-backdrop{display:none}#DeltaHelpPanel,#DeltaPageInstrumentation,#DeltaPlaceHolderUtilityContent,#flexFooter,#s4-ribbonrow,div#s4-titlerow,div#sideNavBox,span#DeltaDelegateControls,span#DeltaSPWebPartManager{display:none!important}#contentBox{margin-right:0!important;margin-left:0!important;width:100%!important}#contentRow{padding-top:0}#s4-bodyContainer{padding-bottom:0!important}#containerParallax{padding-left:0!important;padding-right:0!important}.container .jumbotron,.container-fluid .jumbotron{border-radius:0!important}</style><title>React App</title><link href="/sites/xplorit_portal/XplorIT/static/css/1.98890837.chunk.css" rel="stylesheet"><link href="/sites/xplorit_portal/XplorIT/static/css/main.0f8bff8c.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
  <![endif]--><script>function getCurrentSPUser(){return SPUser={user_ID:_spPageContextInfo.userId,user_email:_spPageContextInfo.userEmail,user_name:_spPageContextInfo.userDisplayName}}</script><script>!function(f){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],l=0,i=[];l<n.length;l++)t=n[l],a[t]&&i.push(a[t][0]),a[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(f[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),p()}function p(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(n=!1)}n&&(c.splice(r--,1),e=l(l.s=t[0]))}return e}var t={},a={2:0},c=[];function l(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return f[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=f,l.c=t,l.d=function(e,r,t){l.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(r,e){if(1&e&&(r=l(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)l.d(t,n,function(e){return r[e]}.bind(null,n));return t},l.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(r,"a",r),r},l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},l.p="/sites/xplorit_portal/XplorIT/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;p()}([])</script><script src="/sites/xplorit_portal/XplorIT/static/js/1.48def273.chunk.js"></script><script src="/sites/xplorit_portal/XplorIT/static/js/main.8339bd94.chunk.js"></script></body>  
</asp:Content>



