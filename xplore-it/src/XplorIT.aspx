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
  
  <head><meta charset="utf-8"><link rel="shortcut icon" href="/sites/xplorit_portal/xplorIT_v2/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/sites/xplorit_portal/xplorIT_v2/manifest.json"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous"><style>.modal-backdrop{display:none}#DeltaHelpPanel,#DeltaPageInstrumentation,#DeltaPlaceHolderUtilityContent,#flexFooter,#s4-ribbonrow,div#s4-titlerow,div#sideNavBox,span#DeltaDelegateControls,span#DeltaSPWebPartManager{display:none!important}#contentBox{margin-right:0!important;margin-left:0!important;width:100%!important}#contentRow{padding-top:0}#s4-bodyContainer{padding-bottom:0!important}#containerParallax{padding-left:0!important;padding-right:0!important}.container .jumbotron,.container-fluid .jumbotron{border-radius:0!important}</style><title>React App</title><link href="/sites/xplorit_portal/xplorIT_v2/static/css/1.68807bc6.chunk.css" rel="stylesheet"><link href="/sites/xplorit_portal/xplorIT_v2/static/css/main.633086f9.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
  <![endif]--><script>// --------------------------------------
  // Get SP User
  // --------------------------------------
  function getCurrentSPUser() {
    return SPUser = {
      user_ID: _spPageContextInfo.userId,
      user_email: _spPageContextInfo.userEmail,
      user_name: _spPageContextInfo.userDisplayName
    }

  }



  function getSiteContext() {
      var ctx = new SP.ClientContext.get_current();


      return ctx;
  }


  // --------------------------------------
  // Configure People Picker 
  // --------------------------------------

  function initializePeoplePicker($peoplePicker, $peoplePickerWidth, $tabIndex) {
    
    //console.log('TCL: initializePeoplePicker -> $peoplePicker', $peoplePicker)
    // Create a schema to store picker properties, and set the properties.
    var $schema = {};
    // var width = $peoplePickerWidth+'px';
    $schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    $schema['PrincipalAccountType'] = 'User';
    $schema['SearchPrincipalSource'] = 15;
    $schema['ResolvePrincipalSource'] = 15;
    $schema['AllowMultipleValues'] = false;
    $schema['MaximumEntitySuggestions'] = 70;
    $schema['Width'] = $peoplePickerWidth;

    //console.log('TCL: initializePeoplePicker -> $schema ', $schema)
    // Render and initialize the picker.
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    SPClientPeoplePicker_InitStandaloneControlWrapper($peoplePicker, null, $schema);




    // return SPClientPeoplePicker_InitStandaloneControlWrapper($peoplePicker, null, $schema);
  }


  // --------------------------------------
  // Prefill PeoplePickers
  // peoplePickerBusiness_lead_TopSpan
  // peoplePickerBusiness_lead_TopSpan
  // --------------------------------------
  function fillPeoplePicker($user, $peoplePicker) {
    
    // //console.log('user owner', user)justify-content: flex-start;
    var pickerName = `peoplePicker${$peoplePicker}_TopSpan`
    // cleanPeoplePicker('peoplePickerOwner_TopSpan');
    
    // cleanPeoplePicker(pickerName);
    // var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerOwner_TopSpan
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[pickerName]
    var usrObj = {
      'Key': $user
    };
    
    peoplePicker.AddUnresolvedUser(usrObj, true);
  }



  // --------------------------------------
  // Clean PeoplePickers
  // --------------------------------------
  function cleanPeoplePicker($peoplePicker) {
    // Get the instance of the People Picker from the Dictionary

    var spclientPeoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[$peoplePicker];

    if (spclientPeoplePicker) {
      //Get the Resolved Users list from Client People Picker


      var ResolvedUsers = document.getElementById(spclientPeoplePicker.ResolvedListElementId).querySelector("span[class='sp-peoplepicker-userSpan']");

      //Clear the Client People Picker
      if (ResolvedUsers !== null) {
        for (var i = 0; i < ResolvedUsers.children.length; i++) {
          spclientPeoplePicker.DeleteProcessedUser(ResolvedUsers[i]);
        }
      }

    }

  }</script><script>!function(f){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],l=0,i=[];l<n.length;l++)t=n[l],a[t]&&i.push(a[t][0]),a[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(f[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),p()}function p(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(n=!1)}n&&(c.splice(r--,1),e=l(l.s=t[0]))}return e}var t={},a={2:0},c=[];function l(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return f[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=f,l.c=t,l.d=function(e,r,t){l.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(r,e){if(1&e&&(r=l(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)l.d(t,n,function(e){return r[e]}.bind(null,n));return t},l.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(r,"a",r),r},l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},l.p="/sites/xplorit_portal/xplorIT_v2/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;p()}([])</script><script src="/sites/xplorit_portal/xplorIT_v2/static/js/1.d4bcca81.chunk.js"></script><script src="/sites/xplorit_portal/xplorIT_v2/static/js/main.5f126926.chunk.js"></script></body>  
</asp:Content>



