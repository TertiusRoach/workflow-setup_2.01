define(["require","exports","back-end/tools/select"],function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.IndexLoginHeader=void 0,(n.IndexLoginHeader||(n.IndexLoginHeader={})).eventsFor=function(e){var n=document.getElementById("login-button"),t=document.getElementById("signup-button");$(n).on("click",function(){o.select.button(n)}),$(t).on("click",function(){o.select.button(t)}),console.log("--".concat(e," Loaded"))}});