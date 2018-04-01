/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 * fork https://github.com/zuk/jquery.inview
 *
 * Modified: use outerHeight() instead of height()
 */
(function(e){"use strict";function t(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}function n(){var t=window.innerHeight;if(t){return t}var n=document.compatMode;if(n||!e.support.boxModel){t=n==="CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight}return t}function r(e){var t=0;for(var n=e;n;n=n.offsetParent){t+=n.offsetTop}return t}function i(){var i=t(),s=i+n(),o=[];e.each(e.cache,function(){if(this.events&&this.events.inview){o.push(this.handle.elem)}});e(o).each(function(){var t=e(this),n=r(this),o=t.outerHeight(),u=n+o,a=t.data("inview")||false,f=t.data("offset")||0,l=n>i&&u<s,c=u+f>i&&n<i,h=n-f<s&&u>s,p=l||c||h||n<i&&u>s;if(p){var d=h?"top":c?"bottom":"both";if(!a||a!==d){t.data("inview",d);t.trigger("inview",[true,d])}}else if(!l&&a){t.data("inview",false);t.trigger("inview",[false])}})}function s(e,t){function i(){if(r!==null){n=true;return}n=false;e();r=setTimeout(function(){r=null;if(n){i()}},t)}var n=false;var r=null;return i}var o=s(i,100);e(window).on("checkInView.inview click.inview ready.inview scroll.inview resize.inview",o)})(jQuery)