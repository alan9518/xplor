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
  <head><meta charset="utf-8"><link rel="shortcut icon" href="/sites/innovationlabs/xplorIT/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/sites/innovationlabs/xplorIT/manifest.json"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous"><style>.modal-backdrop{display:none}#DeltaHelpPanel,#DeltaPageInstrumentation,#DeltaPlaceHolderUtilityContent,#flexFooter,#s4-ribbonrow,div#s4-titlerow,div#sideNavBox,span#DeltaDelegateControls,span#DeltaSPWebPartManager{display:none!important}#contentBox{margin-right:0!important;margin-left:0!important;width:100%!important}#contentRow{padding-top:0}#s4-bodyContainer{padding-bottom:0!important}#containerParallax{padding-left:0!important;padding-right:0!important}.container .jumbotron,.container-fluid .jumbotron{border-radius:0!important}</style><title>React App</title><link href="/sites/innovationlabs/xplorIT/static/css/1.cdc2b4a4.chunk.css" rel="stylesheet"><link href="/sites/innovationlabs/xplorIT/static/css/main.3388823a.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><!--[if lt IE 9]>
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

  }</script><script>!function(f){function e(e){for(var r,n,t=e[0],o=e[1],u=e[2],i=0,l=[];i<t.length;i++)n=t[i],p[n]&&l.push(p[n][0]),p[n]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(f[r]=o[r]);for(s&&s(e);l.length;)l.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var n=c[r],t=!0,o=1;o<n.length;o++){var u=n[o];0!==p[u]&&(t=!1)}t&&(c.splice(r--,1),e=i(i.s=n[0]))}return e}var n={},p={2:0},c=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return f[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=f,i.c=n,i.d=function(e,r,n){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(r,e){if(1&e&&(r=i(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var t in r)i.d(n,t,function(e){return r[e]}.bind(null,t));return n},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="/sites/innovationlabs/xplorIT/";var r=window.webpackJsonp=window.webpackJsonp||[],t=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=t;a()}([])</script><script src="/sites/innovationlabs/xplorIT/static/js/1.1420b36c.chunk.js"></script><script src="/sites/innovationlabs/xplorIT/static/js/main.fb1b159c.chunk.js"></script></body>


</asp:Content>



