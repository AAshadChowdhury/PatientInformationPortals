/*
PNotify 3.0.0 sciactive.com/pnotify/
(C) 2015 Hunter Perrin; Google, Inc.
license Apache-2.0
*/
(function(b,k){"function"===typeof define&&define.amd?define("pnotify",["jquery"],function(q){return k(q,b)}):"object"===typeof exports&&"undefined"!==typeof module?module.exports=k(require("jquery"),global||b):b.PNotify=k(b.jQuery,b)})(this,function(b,k){var q=function(l){var k={dir1:"down",dir2:"left",push:"bottom",spacing1:36,spacing2:36,context:b("body"),modal:!1},g,h,n=b(l),r=function(){h=b("body");d.prototype.options.stack.context=h;n=b(l);n.bind("resize",function(){g&&clearTimeout(g);g=setTimeout(function(){d.positionAll(!0)},
10)})},s=function(c){var a=b("<div />",{"class":"ui-pnotify-modal-overlay"});a.prependTo(c.context);c.overlay_close&&a.click(function(){d.removeStack(c)});return a},d=function(c){this.parseOptions(c);this.init()};b.extend(d.prototype,{version:"3.0.0",options:{title:!1,title_escape:!1,text:!1,text_escape:!1,styling:"brighttheme",addclass:"",cornerclass:"",auto_display:!0,width:"300px",min_height:"16px",type:"notice",icon:!0,animation:"fade",animate_speed:"normal",shadow:!0,hide:!0,delay:8E3,mouse_reset:!0,
remove:!0,insert_brs:!0,destroy:!0,stack:k},modules:{},runModules:function(c,a){var p,b;for(b in this.modules)p="object"===typeof a&&b in a?a[b]:a,"function"===typeof this.modules[b][c]&&(this.modules[b].notice=this,this.modules[b].options="object"===typeof this.options[b]?this.options[b]:{},this.modules[b][c](this,"object"===typeof this.options[b]?this.options[b]:{},p))},state:"initializing",timer:null,animTimer:null,styles:null,elem:null,container:null,title_container:null,text_container:null,animating:!1,
timerHide:!1,init:function(){var c=this;this.modules={};b.extend(!0,this.modules,d.prototype.modules);this.styles="object"===typeof this.options.styling?this.options.styling:d.styling[this.options.styling];this.elem=b("<div />",{"class":"ui-pnotify "+this.options.addclass,css:{display:"none"},"aria-live":"assertive","aria-role":"alertdialog",mouseenter:function(a){if(c.options.mouse_reset&&"out"===c.animating){if(!c.timerHide)return;c.cancelRemove()}c.options.hide&&c.options.mouse_reset&&c.cancelRemove()},
mouseleave:function(a){c.options.hide&&c.options.mouse_reset&&"out"!==c.animating&&c.queueRemove();d.positionAll()}});"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed);this.container=b("<div />",{"class":this.styles.container+" ui-pnotify-container "+("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?this.styles.success:this.styles.notice),role:"alert"}).appendTo(this.elem);""!==
this.options.cornerclass&&this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass);this.options.shadow&&this.container.addClass("ui-pnotify-shadow");!1!==this.options.icon&&b("<div />",{"class":"ui-pnotify-icon"}).append(b("<span />",{"class":!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container);
this.title_container=b("<h4 />",{"class":"ui-pnotify-title"}).appendTo(this.container);!1===this.options.title?this.title_container.hide():this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title);this.text_container=b("<div />",{"class":"ui-pnotify-text","aria-role":"alert"}).appendTo(this.container);!1===this.options.text?this.text_container.hide():this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?
String(this.options.text).replace(/\n/g,"<br />"):this.options.text);"string"===typeof this.options.width&&this.elem.css("width",this.options.width);"string"===typeof this.options.min_height&&this.container.css("min-height",this.options.min_height);d.notices="top"===this.options.stack.push?b.merge([this],d.notices):b.merge(d.notices,[this]);"top"===this.options.stack.push&&this.queuePosition(!1,1);this.options.stack.animation=!1;this.runModules("init");this.options.auto_display&&this.open();return this},
update:function(c){var a=this.options;this.parseOptions(a,c);this.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast");"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed);this.options.cornerclass!==a.cornerclass&&this.container.removeClass("ui-corner-all "+a.cornerclass).addClass(this.options.cornerclass);this.options.shadow!==a.shadow&&(this.options.shadow?this.container.addClass("ui-pnotify-shadow"):this.container.removeClass("ui-pnotify-shadow"));
!1===this.options.addclass?this.elem.removeClass(a.addclass):this.options.addclass!==a.addclass&&this.elem.removeClass(a.addclass).addClass(this.options.addclass);!1===this.options.title?this.title_container.slideUp("fast"):this.options.title!==a.title&&(this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title),!1===a.title&&this.title_container.slideDown(200));!1===this.options.text?this.text_container.slideUp("fast"):this.options.text!==
a.text&&(this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?String(this.options.text).replace(/\n/g,"<br />"):this.options.text),!1===a.text&&this.text_container.slideDown(200));this.options.type!==a.type&&this.container.removeClass(this.styles.error+" "+this.styles.notice+" "+this.styles.success+" "+this.styles.info).addClass("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?
this.styles.success:this.styles.notice);if(this.options.icon!==a.icon||!0===this.options.icon&&this.options.type!==a.type)this.container.find("div.ui-pnotify-icon").remove(),!1!==this.options.icon&&b("<div />",{"class":"ui-pnotify-icon"}).append(b("<span />",{"class":!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container);
this.options.width!==a.width&&this.elem.animate({width:this.options.width});this.options.min_height!==a.min_height&&this.container.animate({minHeight:this.options.min_height});this.options.hide?a.hide||this.queueRemove():this.cancelRemove();this.queuePosition(!0);this.runModules("update",a);return this},open:function(){this.state="opening";this.runModules("beforeOpen");var c=this;this.elem.parent().length||this.elem.appendTo(this.options.stack.context?this.options.stack.context:h);"top"!==this.options.stack.push&&
this.position(!0);this.animateIn(function(){c.queuePosition(!0);c.options.hide&&c.queueRemove();c.state="open";c.runModules("afterOpen")});return this},remove:function(c){this.state="closing";this.timerHide=!!c;this.runModules("beforeClose");var a=this;this.timer&&(l.clearTimeout(this.timer),this.timer=null);this.animateOut(function(){a.state="closed";a.runModules("afterClose");a.queuePosition(!0);a.options.remove&&a.elem.detach();a.runModules("beforeDestroy");if(a.options.destroy&&null!==d.notices){var c=
b.inArray(a,d.notices);-1!==c&&d.notices.splice(c,1)}a.runModules("afterDestroy")});return this},get:function(){return this.elem},parseOptions:function(c,a){this.options=b.extend(!0,{},d.prototype.options);this.options.stack=d.prototype.options.stack;for(var p=[c,a],m,f=0;f<p.length;f++){m=p[f];if("undefined"===typeof m)break;if("object"!==typeof m)this.options.text=m;else for(var e in m)this.modules[e]?b.extend(!0,this.options[e],m[e]):this.options[e]=m[e]}},animateIn:function(c){this.animating=
"in";var a=this;c=function(){a.animTimer&&clearTimeout(a.animTimer);"in"===a.animating&&(a.elem.is(":visible")?(this&&this.call(),a.animating=!1):a.animTimer=setTimeout(c,40))}.bind(c);"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",c).addClass("ui-pnotify-in"),this.elem.css("opacity"),this.elem.addClass("ui-pnotify-fade-in"),this.animTimer=setTimeout(c,650)):(this.elem.addClass("ui-pnotify-in"),c())},animateOut:function(c){this.animating=
"out";var a=this;c=function(){a.animTimer&&clearTimeout(a.animTimer);"out"===a.animating&&("0"!=a.elem.css("opacity")&&a.elem.is(":visible")?a.animTimer=setTimeout(c,40):(a.elem.removeClass("ui-pnotify-in"),this&&this.call(),a.animating=!1))}.bind(c);"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",c).removeClass("ui-pnotify-fade-in"),this.animTimer=setTimeout(c,650)):(this.elem.removeClass("ui-pnotify-in"),c())},position:function(c){var a=
this.options.stack,b=this.elem;"undefined"===typeof a.context&&(a.context=h);if(a){"number"!==typeof a.nextpos1&&(a.nextpos1=a.firstpos1);"number"!==typeof a.nextpos2&&(a.nextpos2=a.firstpos2);"number"!==typeof a.addpos2&&(a.addpos2=0);var d=!b.hasClass("ui-pnotify-in");if(!d||c){a.modal&&(a.overlay?a.overlay.show():a.overlay=s(a));b.addClass("ui-pnotify-move");var f;switch(a.dir1){case "down":f="top";break;case "up":f="bottom";break;case "left":f="right";break;case "right":f="left"}c=parseInt(b.css(f).replace(/(?:\..*|[^0-9.])/g,
""));isNaN(c)&&(c=0);"undefined"!==typeof a.firstpos1||d||(a.firstpos1=c,a.nextpos1=a.firstpos1);var e;switch(a.dir2){case "down":e="top";break;case "up":e="bottom";break;case "left":e="right";break;case "right":e="left"}c=parseInt(b.css(e).replace(/(?:\..*|[^0-9.])/g,""));isNaN(c)&&(c=0);"undefined"!==typeof a.firstpos2||d||(a.firstpos2=c,a.nextpos2=a.firstpos2);if("down"===a.dir1&&a.nextpos1+b.height()>(a.context.is(h)?n.height():a.context.prop("scrollHeight"))||"up"===a.dir1&&a.nextpos1+b.height()>
(a.context.is(h)?n.height():a.context.prop("scrollHeight"))||"left"===a.dir1&&a.nextpos1+b.width()>(a.context.is(h)?n.width():a.context.prop("scrollWidth"))||"right"===a.dir1&&a.nextpos1+b.width()>(a.context.is(h)?n.width():a.context.prop("scrollWidth")))a.nextpos1=a.firstpos1,a.nextpos2+=a.addpos2+("undefined"===typeof a.spacing2?25:a.spacing2),a.addpos2=0;"number"===typeof a.nextpos2&&(a.animation?b.css(e,a.nextpos2+"px"):(b.removeClass("ui-pnotify-move"),b.css(e,a.nextpos2+"px"),b.css(e),b.addClass("ui-pnotify-move")));
switch(a.dir2){case "down":case "up":b.outerHeight(!0)>a.addpos2&&(a.addpos2=b.height());break;case "left":case "right":b.outerWidth(!0)>a.addpos2&&(a.addpos2=b.width())}"number"===typeof a.nextpos1&&(a.animation?b.css(f,a.nextpos1+"px"):(b.removeClass("ui-pnotify-move"),b.css(f,a.nextpos1+"px"),b.css(f),b.addClass("ui-pnotify-move")));switch(a.dir1){case "down":case "up":a.nextpos1+=b.height()+("undefined"===typeof a.spacing1?25:a.spacing1);break;case "left":case "right":a.nextpos1+=b.width()+("undefined"===
typeof a.spacing1?25:a.spacing1)}}return this}},queuePosition:function(b,a){g&&clearTimeout(g);a||(a=10);g=setTimeout(function(){d.positionAll(b)},a);return this},cancelRemove:function(){this.timer&&l.clearTimeout(this.timer);this.animTimer&&l.clearTimeout(this.animTimer);"closing"===this.state&&(this.state="open",this.animating=!1,this.elem.addClass("ui-pnotify-in"),"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-in"));return this},queueRemove:function(){var b=this;this.cancelRemove();
this.timer=l.setTimeout(function(){b.remove(!0)},isNaN(this.options.delay)?0:this.options.delay);return this}});b.extend(d,{notices:[],reload:q,removeAll:function(){b.each(d.notices,function(){this.remove&&this.remove(!1)})},removeStack:function(c){b.each(d.notices,function(){this.remove&&this.options.stack===c&&this.remove(!1)})},positionAll:function(c){g&&clearTimeout(g);g=null;if(d.notices&&d.notices.length)b.each(d.notices,function(){var a=this.options.stack;a&&(a.overlay&&a.overlay.hide(),a.nextpos1=
a.firstpos1,a.nextpos2=a.firstpos2,a.addpos2=0,a.animation=c)}),b.each(d.notices,function(){this.position()});else{var a=d.prototype.options.stack;a&&(delete a.nextpos1,delete a.nextpos2)}},styling:{brighttheme:{container:"brighttheme",notice:"brighttheme-notice",notice_icon:"brighttheme-icon-notice",info:"brighttheme-info",info_icon:"brighttheme-icon-info",success:"brighttheme-success",success_icon:"brighttheme-icon-success",error:"brighttheme-error",error_icon:"brighttheme-icon-error"},jqueryui:{container:"ui-widget ui-widget-content ui-corner-all",
notice:"ui-state-highlight",notice_icon:"ui-icon ui-icon-info",info:"",info_icon:"ui-icon ui-icon-info",success:"ui-state-default",success_icon:"ui-icon ui-icon-circle-check",error:"ui-state-error",error_icon:"ui-icon ui-icon-alert"},bootstrap3:{container:"alert",notice:"alert-warning",notice_icon:"glyphicon glyphicon-exclamation-sign",info:"alert-info",info_icon:"glyphicon glyphicon-info-sign",success:"alert-success",success_icon:"glyphicon glyphicon-ok-sign",error:"alert-danger",error_icon:"glyphicon glyphicon-warning-sign"}}});
d.styling.fontawesome=b.extend({},d.styling.bootstrap3);b.extend(d.styling.fontawesome,{notice_icon:"fa fa-exclamation-circle",info_icon:"fa fa-info",success_icon:"fa fa-check",error_icon:"fa fa-warning"});l.document.body?r():b(r);return d};return q(k)});

(function(e,c){"function"===typeof define&&define.amd?define("pnotify.desktop",["jquery","pnotify"],c):"object"===typeof exports&&"undefined"!==typeof module?module.exports=c(require("jquery"),require("./pnotify")):c(e.jQuery,e.PNotify)})(this,function(e,c){var d,f=function(a,b){f="Notification"in window?function(a,b){return new Notification(a,b)}:"mozNotification"in navigator?function(a,b){return navigator.mozNotification.createNotification(a,b.body,b.icon).show()}:"webkitNotifications"in window?
function(a,b){return window.webkitNotifications.createNotification(b.icon,a,b.body)}:function(a,b){return null};return f(a,b)};c.prototype.options.desktop={desktop:!1,fallback:!0,icon:null,tag:null};c.prototype.modules.desktop={tag:null,icon:null,genNotice:function(a,b){this.icon=null===b.icon?"http://sciactive.com/pnotify/includes/desktop/"+a.options.type+".png":!1===b.icon?null:b.icon;if(null===this.tag||null!==b.tag)this.tag=null===b.tag?"PNotify-"+Math.round(1E6*Math.random()):b.tag;a.desktop=
f(a.options.title,{icon:this.icon,body:b.text||a.options.text,tag:this.tag});!("close"in a.desktop)&&"cancel"in a.desktop&&(a.desktop.close=function(){a.desktop.cancel()});a.desktop.onclick=function(){a.elem.trigger("click")};a.desktop.onclose=function(){"closing"!==a.state&&"closed"!==a.state&&a.remove()}},init:function(a,b){b.desktop&&(d=c.desktop.checkPermission(),0!==d?b.fallback||(a.options.auto_display=!1):this.genNotice(a,b))},update:function(a,b,c){0!==d&&b.fallback||!b.desktop||this.genNotice(a,
b)},beforeOpen:function(a,b){0!==d&&b.fallback||!b.desktop||a.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in")},afterOpen:function(a,b){0!==d&&b.fallback||!b.desktop||(a.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in"),"show"in a.desktop&&a.desktop.show())},beforeClose:function(a,b){0!==d&&b.fallback||!b.desktop||a.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in")},afterClose:function(a,b){0!==d&&b.fallback||!b.desktop||(a.elem.css({left:"-10000px"}).removeClass("ui-pnotify-in"),
"close"in a.desktop&&a.desktop.close())}};c.desktop={permission:function(){"undefined"!==typeof Notification&&"requestPermission"in Notification?Notification.requestPermission():"webkitNotifications"in window&&window.webkitNotifications.requestPermission()},checkPermission:function(){return"undefined"!==typeof Notification&&"permission"in Notification?"granted"===Notification.permission?0:1:"webkitNotifications"in window?0==window.webkitNotifications.checkPermission()?0:1:1}};d=c.desktop.checkPermission()});

(function(d,e){"function"===typeof define&&define.amd?define("pnotify.buttons",["jquery","pnotify"],e):"object"===typeof exports&&"undefined"!==typeof module?module.exports=e(require("jquery"),require("./pnotify")):e(d.jQuery,d.PNotify)})(this,function(d,e){e.prototype.options.buttons={closer:!0,closer_hover:!0,sticker:!0,sticker_hover:!0,show_on_nonblock:!1,labels:{close:"Close",stick:"Stick",unstick:"Unstick"},classes:{closer:null,pin_up:null,pin_down:null}};e.prototype.modules.buttons={closer:null,
sticker:null,init:function(a,b){var c=this;a.elem.on({mouseenter:function(b){!c.options.sticker||a.options.nonblock&&a.options.nonblock.nonblock&&!c.options.show_on_nonblock||c.sticker.trigger("pnotify:buttons:toggleStick").css("visibility","visible");!c.options.closer||a.options.nonblock&&a.options.nonblock.nonblock&&!c.options.show_on_nonblock||c.closer.css("visibility","visible")},mouseleave:function(a){c.options.sticker_hover&&c.sticker.css("visibility","hidden");c.options.closer_hover&&c.closer.css("visibility",
"hidden")}});this.sticker=d("<div />",{"class":"ui-pnotify-sticker","aria-role":"button","aria-pressed":a.options.hide?"false":"true",tabindex:"0",title:a.options.hide?b.labels.stick:b.labels.unstick,css:{cursor:"pointer",visibility:b.sticker_hover?"hidden":"visible"},click:function(){a.options.hide=!a.options.hide;a.options.hide?a.queueRemove():a.cancelRemove();d(this).trigger("pnotify:buttons:toggleStick")}}).bind("pnotify:buttons:toggleStick",function(){var b=null===c.options.classes.pin_up?a.styles.pin_up:
c.options.classes.pin_up,e=null===c.options.classes.pin_down?a.styles.pin_down:c.options.classes.pin_down;d(this).attr("title",a.options.hide?c.options.labels.stick:c.options.labels.unstick).children().attr("class","").addClass(a.options.hide?b:e).attr("aria-pressed",a.options.hide?"false":"true")}).append("<span />").trigger("pnotify:buttons:toggleStick").prependTo(a.container);(!b.sticker||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock)&&this.sticker.css("display","none");
this.closer=d("<div />",{"class":"ui-pnotify-closer","aria-role":"button",tabindex:"0",title:b.labels.close,css:{cursor:"pointer",visibility:b.closer_hover?"hidden":"visible"},click:function(){a.remove(!1);c.sticker.css("visibility","hidden");c.closer.css("visibility","hidden")}}).append(d("<span />",{"class":null===b.classes.closer?a.styles.closer:b.classes.closer})).prependTo(a.container);(!b.closer||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock)&&this.closer.css("display",
"none")},update:function(a,b){!b.closer||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock?this.closer.css("display","none"):b.closer&&this.closer.css("display","block");!b.sticker||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock?this.sticker.css("display","none"):b.sticker&&this.sticker.css("display","block");this.sticker.trigger("pnotify:buttons:toggleStick");this.closer.find("span").attr("class","").addClass(null===b.classes.closer?a.styles.closer:b.classes.closer);
b.sticker_hover?this.sticker.css("visibility","hidden"):a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock||this.sticker.css("visibility","visible");b.closer_hover?this.closer.css("visibility","hidden"):a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock||this.closer.css("visibility","visible")}};d.extend(e.styling.brighttheme,{closer:"brighttheme-icon-closer",pin_up:"brighttheme-icon-sticker",pin_down:"brighttheme-icon-sticker brighttheme-icon-stuck"});d.extend(e.styling.jqueryui,
{closer:"ui-icon ui-icon-close",pin_up:"ui-icon ui-icon-pin-w",pin_down:"ui-icon ui-icon-pin-s"});d.extend(e.styling.bootstrap2,{closer:"icon-remove",pin_up:"icon-pause",pin_down:"icon-play"});d.extend(e.styling.bootstrap3,{closer:"glyphicon glyphicon-remove",pin_up:"glyphicon glyphicon-pause",pin_down:"glyphicon glyphicon-play"});d.extend(e.styling.fontawesome,{closer:"fa fa-times",pin_up:"fa fa-pause",pin_down:"fa fa-play"})});

(function(e,c){"function"===typeof define&&define.amd?define("pnotify.confirm",["jquery","pnotify"],c):"object"===typeof exports&&"undefined"!==typeof module?module.exports=c(require("jquery"),require("./pnotify")):c(e.jQuery,e.PNotify)})(this,function(e,c){c.prototype.options.confirm={confirm:!1,prompt:!1,prompt_class:"",prompt_default:"",prompt_multi_line:!1,align:"right",buttons:[{text:"Ok",addClass:"",promptTrigger:!0,click:function(b,a){b.remove();b.get().trigger("pnotify.confirm",[b,a])}},{text:"Cancel",
addClass:"",click:function(b){b.remove();b.get().trigger("pnotify.cancel",b)}}]};c.prototype.modules.confirm={container:null,prompt:null,init:function(b,a){this.container=e('<div class="ui-pnotify-action-bar" style="margin-top:5px;clear:both;" />').css("text-align",a.align).appendTo(b.container);a.confirm||a.prompt?this.makeDialog(b,a):this.container.hide()},update:function(b,a){a.confirm?(this.makeDialog(b,a),this.container.show()):this.container.hide().empty()},afterOpen:function(b,a){a.prompt&&
this.prompt.focus()},makeDialog:function(b,a){var h=!1,l=this,g,d;this.container.empty();a.prompt&&(this.prompt=e("<"+(a.prompt_multi_line?'textarea rows="5"':'input type="text"')+' style="margin-bottom:5px;clear:both;" />').addClass(("undefined"===typeof b.styles.input?"":b.styles.input)+" "+("undefined"===typeof a.prompt_class?"":a.prompt_class)).val(a.prompt_default).appendTo(this.container));for(var m=a.buttons[0]&&a.buttons[0]!==c.prototype.options.confirm.buttons[0],f=0;f<a.buttons.length;f++)if(!(null===
a.buttons[f]||m&&c.prototype.options.confirm.buttons[f]&&c.prototype.options.confirm.buttons[f]===a.buttons[f])){g=a.buttons[f];h?this.container.append(" "):h=!0;d=e('<button type="button" class="ui-pnotify-action-button" />').addClass(("undefined"===typeof b.styles.btn?"":b.styles.btn)+" "+("undefined"===typeof g.addClass?"":g.addClass)).text(g.text).appendTo(this.container).on("click",function(k){return function(){"function"==typeof k.click&&k.click(b,a.prompt?l.prompt.val():null)}}(g));a.prompt&&
!a.prompt_multi_line&&g.promptTrigger&&this.prompt.keypress(function(b){return function(a){13==a.keyCode&&b.click()}}(d));b.styles.text&&d.wrapInner('<span class="'+b.styles.text+'"></span>');b.styles.btnhover&&d.hover(function(a){return function(){a.addClass(b.styles.btnhover)}}(d),function(a){return function(){a.removeClass(b.styles.btnhover)}}(d));if(b.styles.btnactive)d.on("mousedown",function(a){return function(){a.addClass(b.styles.btnactive)}}(d)).on("mouseup",function(a){return function(){a.removeClass(b.styles.btnactive)}}(d));
if(b.styles.btnfocus)d.on("focus",function(a){return function(){a.addClass(b.styles.btnfocus)}}(d)).on("blur",function(a){return function(){a.removeClass(b.styles.btnfocus)}}(d))}}};e.extend(c.styling.jqueryui,{btn:"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",btnhover:"ui-state-hover",btnactive:"ui-state-active",btnfocus:"ui-state-focus",input:"",text:"ui-button-text"});e.extend(c.styling.bootstrap2,{btn:"btn",input:""});e.extend(c.styling.bootstrap3,{btn:"btn btn-default",
input:"form-control"});e.extend(c.styling.fontawesome,{btn:"btn btn-default",input:"form-control"})});

(function(b,a){"function"===typeof define&&define.amd?define("pnotify.callbacks",["jquery","pnotify"],a):"object"===typeof exports&&"undefined"!==typeof module?module.exports=a(require("jquery"),require("./pnotify")):a(b.jQuery,b.PNotify)})(this,function(b,a){var c=a.prototype.init,d=a.prototype.open,e=a.prototype.remove;a.prototype.init=function(){this.options.before_init&&this.options.before_init(this.options);c.apply(this,arguments);this.options.after_init&&this.options.after_init(this)};a.prototype.open=
function(){var a;this.options.before_open&&(a=this.options.before_open(this));!1!==a&&(d.apply(this,arguments),this.options.after_open&&this.options.after_open(this))};a.prototype.remove=function(a){var b;this.options.before_close&&(b=this.options.before_close(this,a));!1!==b&&(e.apply(this,arguments),this.options.after_close&&this.options.after_close(this,a))}});

(function(e,d){"function"===typeof define&&define.amd?define("pnotify.animate",["jquery","pnotify"],d):"object"===typeof exports&&"undefined"!==typeof module?module.exports=d(require("jquery"),require("./pnotify")):d(e.jQuery,e.PNotify)})(this,function(e,d){d.prototype.options.animate={animate:!1,in_class:"",out_class:""};d.prototype.modules.animate={init:function(a,b){this.setUpAnimations(a,b);a.attention=function(c,b){a.elem.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
function(){a.elem.removeClass(c);b&&b.call(a)}).addClass("animated "+c)}},update:function(a,b,c){b.animate!=c.animate&&this.setUpAnimations(a,b)},setUpAnimations:function(a,b){if(b.animate){a.options.animation="none";a.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast");a._animateIn||(a._animateIn=a.animateIn);a._animateOut||(a._animateOut=a.animateOut);a.animateIn=this.animateIn.bind(this);a.animateOut=this.animateOut.bind(this);var c=400;"slow"===a.options.animate_speed?
c=600:"fast"===a.options.animate_speed?c=200:0<a.options.animate_speed&&(c=a.options.animate_speed);c/=1E3;a.elem.addClass("animated").css({"-webkit-animation-duration":c+"s","-moz-animation-duration":c+"s","animation-duration":c+"s"})}else a._animateIn&&a._animateOut&&(a.animateIn=a._animateIn,delete a._animateIn,a.animateOut=a._animateOut,delete a._animateOut,a.elem.addClass("animated"))},animateIn:function(a){this.notice.animating="in";var b=this;a=function(){this&&this.call();b.notice.animating=
!1}.bind(a);this.notice.elem.show().one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",a).removeClass(this.options.out_class).addClass("ui-pnotify-in").addClass(this.options.in_class)},animateOut:function(a){this.notice.animating="out";var b=this;a=function(){b.notice.elem.removeClass("ui-pnotify-in");this&&this.call();b.notice.animating=!1}.bind(a);this.notice.elem.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",a).removeClass(this.options.in_class).addClass(this.options.out_class)}}});

(function(b,a){"function"===typeof define&&define.amd?define("pnotify.history",["jquery","pnotify"],a):"object"===typeof exports&&"undefined"!==typeof module?module.exports=a(require("jquery"),require("./pnotify")):a(b.jQuery,b.PNotify)})(this,function(b,a){var c,e;b(function(){b("body").on("pnotify.history-all",function(){b.each(a.notices,function(){this.modules.history.inHistory&&(this.elem.is(":visible")?this.options.hide&&this.queueRemove():this.open&&this.open())})}).on("pnotify.history-last",
function(){var b="top"===a.prototype.options.stack.push,d=b?0:-1,c;do{c=-1===d?a.notices.slice(d):a.notices.slice(d,d+1);if(!c[0])return!1;d=b?d+1:d-1}while(!c[0].modules.history.inHistory||c[0].elem.is(":visible"));c[0].open&&c[0].open()})});a.prototype.options.history={history:!0,menu:!1,fixed:!0,maxonscreen:Infinity,labels:{redisplay:"Redisplay",all:"All",last:"Last"}};a.prototype.modules.history={inHistory:!1,init:function(a,d){a.options.destroy=!1;this.inHistory=d.history;d.menu&&"undefined"===
typeof c&&(c=b("<div />",{"class":"ui-pnotify-history-container "+a.styles.hi_menu,mouseleave:function(){c.animate({top:"-"+e+"px"},{duration:100,queue:!1})}}).append(b("<div />",{"class":"ui-pnotify-history-header",text:d.labels.redisplay})).append(b("<button />",{"class":"ui-pnotify-history-all "+a.styles.hi_btn,text:d.labels.all,mouseenter:function(){b(this).addClass(a.styles.hi_btnhov)},mouseleave:function(){b(this).removeClass(a.styles.hi_btnhov)},click:function(){b(this).trigger("pnotify.history-all");
return!1}})).append(b("<button />",{"class":"ui-pnotify-history-last "+a.styles.hi_btn,text:d.labels.last,mouseenter:function(){b(this).addClass(a.styles.hi_btnhov)},mouseleave:function(){b(this).removeClass(a.styles.hi_btnhov)},click:function(){b(this).trigger("pnotify.history-last");return!1}})).appendTo("body"),e=b("<span />",{"class":"ui-pnotify-history-pulldown "+a.styles.hi_hnd,mouseenter:function(){c.animate({top:"0"},{duration:100,queue:!1})}}).appendTo(c).offset().top+2,c.css({top:"-"+e+
"px"}),d.fixed&&c.addClass("ui-pnotify-history-fixed"))},update:function(a,b){this.inHistory=b.history;b.fixed&&c?c.addClass("ui-pnotify-history-fixed"):c&&c.removeClass("ui-pnotify-history-fixed")},beforeOpen:function(c,d){if(a.notices&&a.notices.length>d.maxonscreen){var e;e="top"!==c.options.stack.push?a.notices.slice(0,a.notices.length-d.maxonscreen):a.notices.slice(d.maxonscreen,a.notices.length);b.each(e,function(){this.remove&&this.remove()})}}};b.extend(a.styling.jqueryui,{hi_menu:"ui-state-default ui-corner-bottom",
hi_btn:"ui-state-default ui-corner-all",hi_btnhov:"ui-state-hover",hi_hnd:"ui-icon ui-icon-grip-dotted-horizontal"});b.extend(a.styling.bootstrap2,{hi_menu:"well",hi_btn:"btn",hi_btnhov:"",hi_hnd:"icon-chevron-down"});b.extend(a.styling.bootstrap3,{hi_menu:"well",hi_btn:"btn btn-default",hi_btnhov:"",hi_hnd:"glyphicon glyphicon-chevron-down"});b.extend(a.styling.fontawesome,{hi_menu:"well",hi_btn:"btn btn-default",hi_btnhov:"",hi_hnd:"fa fa-chevron-down"})});

(function(g,c){"function"===typeof define&&define.amd?define("pnotify.mobile",["jquery","pnotify"],c):"object"===typeof exports&&"undefined"!==typeof module?module.exports=c(require("jquery"),require("./pnotify")):c(g.jQuery,g.PNotify)})(this,function(g,c){c.prototype.options.mobile={swipe_dismiss:!0,styling:!0};c.prototype.modules.mobile={swipe_dismiss:!0,init:function(a,b){var c=this,d=null,e=null,f=null;this.swipe_dismiss=b.swipe_dismiss;this.doMobileStyling(a,b);a.elem.on({touchstart:function(b){c.swipe_dismiss&&
(d=b.originalEvent.touches[0].screenX,f=a.elem.width(),a.container.css("left","0"))},touchmove:function(b){d&&c.swipe_dismiss&&(e=b.originalEvent.touches[0].screenX-d,b=(1-Math.abs(e)/f)*a.options.opacity,a.elem.css("opacity",b),a.container.css("left",e))},touchend:function(){if(d&&c.swipe_dismiss){if(40<Math.abs(e)){var b=0>e?-2*f:2*f;a.elem.animate({opacity:0},100);a.container.animate({left:b},100);a.remove()}else a.elem.animate({opacity:a.options.opacity},100),a.container.animate({left:0},100);
f=e=d=null}},touchcancel:function(){d&&c.swipe_dismiss&&(a.elem.animate({opacity:a.options.opacity},100),a.container.animate({left:0},100),f=e=d=null)}})},update:function(a,b){this.swipe_dismiss=b.swipe_dismiss;this.doMobileStyling(a,b)},doMobileStyling:function(a,b){if(b.styling)if(a.elem.addClass("ui-pnotify-mobile-able"),480>=g(window).width())a.options.stack.mobileOrigSpacing1||(a.options.stack.mobileOrigSpacing1=a.options.stack.spacing1,a.options.stack.mobileOrigSpacing2=a.options.stack.spacing2),
a.options.stack.spacing1=0,a.options.stack.spacing2=0;else{if(a.options.stack.mobileOrigSpacing1||a.options.stack.mobileOrigSpacing2)a.options.stack.spacing1=a.options.stack.mobileOrigSpacing1,delete a.options.stack.mobileOrigSpacing1,a.options.stack.spacing2=a.options.stack.mobileOrigSpacing2,delete a.options.stack.mobileOrigSpacing2}else a.elem.removeClass("ui-pnotify-mobile-able"),a.options.stack.mobileOrigSpacing1&&(a.options.stack.spacing1=a.options.stack.mobileOrigSpacing1,delete a.options.stack.mobileOrigSpacing1),
a.options.stack.mobileOrigSpacing2&&(a.options.stack.spacing2=a.options.stack.mobileOrigSpacing2,delete a.options.stack.mobileOrigSpacing2)}}});

(function(h,f){"function"===typeof define&&define.amd?define("pnotify.nonblock",["jquery","pnotify"],f):"object"===typeof exports&&"undefined"!==typeof module?module.exports=f(require("jquery"),require("./pnotify")):f(h.jQuery,h.PNotify)})(this,function(h,f){var l=/^on/,m=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,n=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/,p=/^(scroll|resize|(un)?load|abort|error)$/,k=function(c,b){var d;c=c.toLowerCase();document.createEvent&&
this.dispatchEvent?(c=c.replace(l,""),c.match(m)?(h(this).offset(),d=document.createEvent("MouseEvents"),d.initMouseEvent(c,b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)):c.match(n)?(d=document.createEvent("UIEvents"),d.initUIEvent(c,b.bubbles,b.cancelable,b.view,b.detail)):c.match(p)&&(d=document.createEvent("HTMLEvents"),d.initEvent(c,b.bubbles,b.cancelable)),d&&this.dispatchEvent(d)):(c.match(l)||
(c="on"+c),d=document.createEventObject(b),this.fireEvent(c,d))},g,e=function(c,b,d){c.elem.addClass("ui-pnotify-nonblock-hide");var a=document.elementFromPoint(b.clientX,b.clientY);c.elem.removeClass("ui-pnotify-nonblock-hide");var f=h(a),e=f.css("cursor");"auto"===e&&"A"===a.tagName&&(e="pointer");c.elem.css("cursor","auto"!==e?e:"default");g&&g.get(0)==a||(g&&(k.call(g.get(0),"mouseleave",b.originalEvent),k.call(g.get(0),"mouseout",b.originalEvent)),k.call(a,"mouseenter",b.originalEvent),k.call(a,
"mouseover",b.originalEvent));k.call(a,d,b.originalEvent);g=f};f.prototype.options.nonblock={nonblock:!1};f.prototype.modules.nonblock={init:function(c,b){var d=this;c.elem.on({mouseenter:function(a){d.options.nonblock&&a.stopPropagation();d.options.nonblock&&c.elem.addClass("ui-pnotify-nonblock-fade")},mouseleave:function(a){d.options.nonblock&&a.stopPropagation();g=null;c.elem.css("cursor","auto");d.options.nonblock&&"out"!==c.animating&&c.elem.removeClass("ui-pnotify-nonblock-fade")},mouseover:function(a){d.options.nonblock&&
a.stopPropagation()},mouseout:function(a){d.options.nonblock&&a.stopPropagation()},mousemove:function(a){d.options.nonblock&&(a.stopPropagation(),e(c,a,"onmousemove"))},mousedown:function(a){d.options.nonblock&&(a.stopPropagation(),a.preventDefault(),e(c,a,"onmousedown"))},mouseup:function(a){d.options.nonblock&&(a.stopPropagation(),a.preventDefault(),e(c,a,"onmouseup"))},click:function(a){d.options.nonblock&&(a.stopPropagation(),e(c,a,"onclick"))},dblclick:function(a){d.options.nonblock&&(a.stopPropagation(),
e(c,a,"ondblclick"))}})}}});

/* ------------------------------------------------------------------------------
*
*  # PNotify notifications
*
*  Specific JS code additions for components_notifications_pnotify.html page
*
*  Version: 1.1
*  Latest update: Feb 1, 2016
*
* ---------------------------------------------------------------------------- */

$(function() {


    // Popup notifications
    // ------------------------------

    //
    // Notification styles
    //

    // Default style
    $('#pnotify-default').on('click', function () {
        new PNotify({
            title: 'Primary notice',
            text: 'Check me out! I\'m a notice.',
            icon: 'icofont icofont-info-circle',
            type: 'default'
        });
    });

    // primary style
    $('#pnotify-primary').on('click', function () {
        new PNotify({
            title: 'Primary notice',
            text: 'Check me out! I\'m a notice.',
            icon: 'icofont icofont-info-circle',
            type: 'primary'
        });
    });

    // Success notification
    $('#pnotify-success').on('click', function () {
        new PNotify({
            title: 'Success notice',
            text: 'Check me out! I\'m a notice.',
            icon: 'icofont icofont-info-circle',
            type: 'success'
        });
    });

    // Info notification
    $('#pnotify-info').on('click', function () {
        new PNotify({
            title: 'Info notice',
            text: 'Check me out! I\'m a notice.',
            icon: 'icofont icofont-info-square',
            type: 'info'
        });
    });



    // Danger notification
    $('#pnotify-danger').on('click', function () {
        new PNotify({
            title: 'Danger notice',
            text: 'Check me out! I\'m a notice.',
            icon: 'icofont icofont-info-circle',
            type: 'error'
        });
    });




    // Styled left
    $('#pnotify-styled-left').on('click', function () {
        new PNotify({
            title: 'Left icon',
            text: 'Check me out! I\'m a notice.',
            addclass: 'alert alert-styled-left',
            type: 'info'
        });
    });

    // Styled right
    $('#pnotify-styled-right').on('click', function () {
        new PNotify({
            title: 'Right icon',
            text: 'Check me out! I\'m a notice.',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });
    });

    // Styled with arrow
    $('#pnotify-styled-arrow').on('click', function () {
        new PNotify({
            title: 'Notice with arrow',
            text: 'Check me out! I\'m a notice.',
            addclass: 'alert alert-styled-left alert-arrow-left',
            type: 'info'
        });
    });

    // Custom style
    $('#pnotify-custom-styled').on('click', function () {
        new PNotify({
            title: 'Custom color notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'alert alert-styled-left alert-styled-custom alert-arrow-left alpha-teal text-teal-800'
        });
    });










    //
    // Solid color style
    //

    // Solid default
    $('#pnotify-solid-default').on('click', function () {
        new PNotify({
            title: 'default notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-basic-default'
        });
    });

    // Solid primary
    $('#pnotify-solid-primary').on('click', function () {
        new PNotify({
            title: 'Primary notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-primary'
        });
    });

    // Solid danger
    $('#pnotify-solid-danger').on('click', function () {
        new PNotify({
            title: 'Danger notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-danger'
        });
    });

    // Solid success
    $('#pnotify-solid-success').on('click', function () {
        new PNotify({
            title: 'Success notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-success'
        });
    });

    // Solid warning
    $('#pnotify-solid-warning').on('click', function () {
        new PNotify({
            title: 'Warning notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-warning'
        });
    });

    // Solid info
    $('#pnotify-solid-info').on('click', function () {
        new PNotify({
            title: 'Info notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-info'
        });
    });

     // Solid inverse
    $('#pnotify-solid-inverse').on('click', function () {
        new PNotify({
            title: 'Info notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-inverse'
        });
    });


    // Custom solid color
    $('#pnotify-solid-custom').on('click', function () {
        new PNotify({
            title: 'Custom color notice',
            text: 'Check me out! I\'m a notice.',
            addclass: 'bg-teal'
        });
    });

    // Solid styled left
    $('#pnotify-solid-styled-left').on('click', function () {
        new PNotify({
            title: 'Left icon',
            text: 'Check me out! I\'m a notice.',
            addclass: 'alert bg-primary alert-styled-left'
        });
    });

    // Solid styled right
    $('#pnotify-solid-styled-right').on('click', function () {
        new PNotify({
            title: 'Right icon',
            text: 'Check me out! I\'m a notice.',
            addclass: 'alert bg-danger alert-styled-right',
            type: 'error'
        });
    });



    // Desktop notifications
    // ------------------------------

    // Danger
    $('#pnotify-desktop-danger').on('click', function () {
        PNotify.desktop.permission();
        (new PNotify({
            title: 'Danger Desktop Notice',
            type: 'danger',
            text: 'I\'m a danger desktop notification, if you have given me a permission.',
            desktop: {
                desktop: true,
                icon: 'assets/images/pnotify/danger.png'
            }
        })
        ).get().click(function(e) {
            if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
            alert('Hey! You clicked the desktop notification!');
        });
    });

    // Success
    $('#pnotify-desktop-success').on('click', function () {
        PNotify.desktop.permission();
        (new PNotify({
            title: 'Success Desktop Notice',
            type: 'success',
            text: 'I\'m a success desktop notification, if you have given me a permission.',
            desktop: {
                desktop: true,
                icon: 'assets/images/pnotify/success.png'
            }
        })
        ).get().click(function(e) {
            if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
            alert('Hey! You clicked the desktop notification!');
        });
    });

    // Warning
    $('#pnotify-desktop-warning').on('click', function () {
        PNotify.desktop.permission();
        (new PNotify({
            title: 'Warning Desktop Notice',
            type: 'warning',
            text: 'I\'m a warning desktop notification, if you have given me a permission.',
            desktop: {
                desktop: true,
                icon: 'assets/images/pnotify/warning.png'
            }
        })
        ).get().click(function(e) {
            if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
            alert('Hey! You clicked the desktop notification!');
        });
    });

    // Info
    $('#pnotify-desktop-info').on('click', function () {
        PNotify.desktop.permission();
        (new PNotify({
            title: 'Info Desktop Notice',
            type: 'info',
            text: 'I\'m an info desktop notification, if you have given me a permission.',
            desktop: {
                desktop: true,
                icon: 'assets/images/pnotify/notice.png'
            }
        })
        ).get().click(function(e) {
            if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
            alert('Hey! You clicked the desktop notification!');
        });
    });



    // Options
    // ------------------------------

    // No title
    $('#pnotify-no-title').on('click', function () {
        new PNotify({
            text: 'Check me out! I\'m a notice without title.',
            addclass: 'bg-primary',
            icon: 'none'
        });
    });

    // Rich content
    $('#pnotify-rich').on('click', function () {
        new PNotify({
            title: 'Rich content notice',
            text: 'Look at my beautiful <strong>strong</strong>, <a href="#" class="alert-link">linked</a>, <em>emphasized</em>, and <u>underlined</u> text with <i class="icon-make-group"></i> icon.',
            icon: 'icon-comment-discussion'
        });
    });

    // Close on click
    $('#pnotify-click').on('click', function () {
        var notice = new PNotify({
            title: 'Close on click',
            text: 'Click me anywhere to dismiss me.',
            addclass: 'bg-warning',
            hide: false,
            icon:'none',
            buttons: {
                closer: false,
                sticker: false
            }
        });
        notice.get().click(function() {
            notice.remove();
        });
    });

    // Form
    $('#pnotify-form').on('click', function () {
        var notice = new PNotify({
            text: $('#form_notice').html(),
            width: '300px',
            hide: false,
            addclass: 'bg-slate',
            buttons: {
                closer: false,
                sticker: false
            },
            insert_brs: false
        });

        // Remove if cancelled
        notice.get().find('button[name=cancel]').on('click', function() {
            notice.remove();
        })

        // Submit form
        notice.get().submit(function() {
            var username = $(this).find('input[name=username]').val();
            if (!username) {
                alert('Please provide a username.');
                return false;
            }
            notice.update({
                title: 'Welcome',
                text: 'Successfully logged in as ' + username,
                addclass: 'bg-teal',
                icon: true,
                width: PNotify.prototype.options.width,
                hide: true,
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
            return false;
        });
    });

    // Sticky notice
    $('#pnotify-sticky').on('click', function () {
        new PNotify({
            title: 'Sticky notice',
            text: 'Check me out! I\'m a sticky notice. You\'ll have to close me yourself.',
            addclass: 'bg-primary',
            hide: false
        });
    });

    // Sticky buttons
    $('#pnotify-sticky-buttons').on('click', function () {
        new PNotify({
            title: 'No sticky button notice',
            text: 'I\'m a sticky notice with no unsticky button. You\'ll have to close me yourself.',
            addclass: 'bg-primary',
            hide: false,
            buttons: {
                sticker: false
            }
        });
    });

    // Permanent buttons
    $('#pnotify-permanent-buttons').on('click', function () {
        new PNotify({
            title: 'Permanent buttons notice',
            text: 'My buttons are really lonely, so they\'re gonna hang out with us.',
            addclass: 'bg-slate',
            buttons: {
                closer_hover: false,
                sticker_hover: false
            }
        });
    });



    // Modules
    // ------------------------------

    // Confirm
    $('#pnotify-confirm').on('click', function () {

        // Setup
        var notice = new PNotify({
            title: 'Confirmation',
            text: '<p>Are you sure you want to discard changes?</p>',
            hide: false,
            type: 'warning',
            confirm: {
                confirm: true,
                buttons: [
                    {
                        text: 'Yes',
                        addClass: 'btn btn-sm btn-primary'
                    },
                    {
                        addClass: 'btn btn-sm btn-link'
                    }
                ]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        })

        // On confirm
        notice.get().on('pnotify.confirm', function() {
            alert('Ok, cool.');
        })

        // On cancel
        notice.get().on('pnotify.cancel', function() {
            alert('Oh ok. Chicken, I see.');
        });
    });


    // Prompt
    $('#pnotify-prompt').on('click', function () {

        // Setup
        var notice = new PNotify({
            title: 'Input needed',
            text: 'What side would you like?',
            hide: false,
            confirm: {
                prompt: true,
                buttons: [
                    {
                        text: 'Yes',
                        addClass: 'btn btn-sm btn-primary'
                    },
                    {
                        addClass: 'btn btn-sm btn-link'
                    }
                ]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        });

        // On confirm
        notice.get().on('pnotify.confirm', function(e, notice, val) {
            notice.cancelRemove().update({
                title: 'You\'ve chosen a side',
                text: 'You want ' + $('<div/>').text(val).html() + '.',
                icon: 'icon-checkmark3',
                type: 'success',
                delay: 2000,
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        })

        // On cancel
        notice.get().on('pnotify.cancel', function(e, notice) {
            notice.cancelRemove().update({
                title: 'You don\'t want a side',
                text: 'No soup for you!',
                icon: 'icon-blocked',
                type: 'error',
                delay: 2000,
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        });
    });


    // Multiline prompt
    $('#pnotify-multiline').on('click', function () {

        // Setup
        var notice = new PNotify({
            title: 'Input needed',
            text: 'Write me a poem, please.',
            hide: false,
            confirm: {
                prompt: true,
                prompt_multi_line: true,
                prompt_default: 'Roses are red,\nViolets are blue,\n',
                buttons: [
                    {
                        text: 'Yes',
                        addClass: 'btn btn-sm btn-primary'
                    },
                    {
                        addClass: 'btn btn-sm btn-link'
                    }
                ]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        });

        // Confirm
        notice.get().on('pnotify.confirm', function(e, notice, val) {
            notice.cancelRemove().update({
                title: 'Your poem',
                text: $('<div/>').text(val).html(),
                icon: 'icon-checkmark3',
                type: 'success',
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        });

        // On cancel
        notice.get().on('pnotify.cancel', function(e, notice) {
            notice.cancelRemove().update({
                title: 'You don\'t like poetry',
                text: 'Roses are dead,\nViolets are dead,\nI at gardening.',
                icon: 'icon-blocked',
                type: 'error',
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        });
    });


    // Custom buttons
    $('#pnotify-buttons').on('click', function () {
        new PNotify({
            title: 'Choose a side',
            text: 'You have three options to choose from.',
            hide: false,
            width: 420,
            confirm: {
                confirm: true,
                buttons: [
                    {
                        text: 'Fries',
                        addClass: 'btn btn-sm bg-blue',
                        click: function(notice) {
                            notice.update({
                                title: 'You\'ve chosen a side',
                                text: 'You want fries.',
                                icon: 'icon-checkmark3',
                                type: 'success',
                                hide: true,
                                confirm: {
                                    confirm: false
                                },
                                buttons: {
                                    closer: true,
                                    sticker: true
                                }
                            });
                        }
                    },
                    {
                        text: 'Mashed Potatoes',
                        addClass: 'btn btn-sm bg-pink-400',
                        click: function(notice) {
                            notice.update({
                                title: 'You\'ve chosen a side',
                                text: 'You want mashed potatoes.',
                                icon: 'icon-checkmark3',
                                type: 'info',
                                hide: true,
                                confirm: {
                                    confirm: false
                                },
                                buttons: {
                                    closer: true,
                                    sticker: true
                                }
                            });
                        }
                    },
                    {
                        text: 'Fruit',
                        addClass: 'btn btn-sm bg-indigo-400',
                        click: function(notice) {
                            notice.update({
                                title: 'You\'ve chosen a side',
                                text: 'You want fruit.',
                                icon: 'icon-checkmark3',
                                type: 'info',
                                hide: true,
                                confirm: {
                                    confirm: false
                                },
                                buttons: {
                                    closer: true,
                                    sticker: true
                                }
                            });
                        }
                    }
                ]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                closer:'icofont icofont-close-circled',
                history: false
            }
        });
    });


    // Permanotice
    $('#pnotify-permanotice').on('click', function () {
        var permanotice;
        if (permanotice) {
            permanotice.open();
        }
        else {
            permanotice = new PNotify({
                title: 'Now look here',
                text: 'There\'s something you need to know, and I won\'t go away until you come to grips with it.',
                addclass: 'bg-danger',
                hide: false,
                buttons: {
                    closer: false,
                    sticker: false
                }
            });
        }
    });


    // Callbacks
    $('#pnotify-callbacks').on('click', function () {
        var dont_alert = function() {};
        new PNotify({
            title: 'I\'m here',
            text: 'I have a callback for each of my events. I\'ll call all my callbacks while I change states.',
            addclass: 'bg-teal',
            before_init: function(opts) {
                dont_alert('I\'m called before the notice initializes. I\'m passed the options used to make the notice. I can modify them. Watch me replace the word callback with tire iron!');
                opts.text = opts.text.replace(/callback/g, 'tire iron');
            },
            after_init: function(PNotify) {
                dont_alert('I\'m called after the notice initializes. I\'m passed the PNotify object for the current notice: ' + PNotify + '\n\nThere are more callbacks you can assign, but this is the last notice you\'ll see. Check the code to see them all.');
            },
            before_open: function(PNotify) {
                var source_note = 'Return false to cancel opening.';
                dont_alert('I\'m called before the notice opens. I\'m passed the PNotify object for the current notice: ' + PNotify);
            },
            after_open: function(PNotify) {
                alert('I\'m called after the notice opens. I\'m passed the PNotify object for the current notice: ' + PNotify);
            },
            before_close: function(PNotify, timer_hide) {
                var source_note = 'Return false to cancel close. Use PNotify.queueRemove() to set the removal timer again.';
                dont_alert('I\'m called before the notice closes. I\'m passed the PNotify object for the current notice: ' + PNotify);
                dont_alert('I also have an argument called timer_hide, which is true if the notice was closed because the timer ran down. Value: ' + timer_hide);
            },
            after_close: function(PNotify, timer_hide) {
                alert('I\'m called after the notice closes. I\'m passed the PNotify object for the current notice: ' + PNotify);
                dont_alert('I also have an argument called timer_hide, which is true if the notice was closed because the timer ran down. Value: ' + timer_hide);
            }
        });
    });


    // Switching notices
    $('#pnotify-switching').on('click', function () {
        new PNotify({
            title: 'Notice',
            text: 'Right now I\'m a notice.',
            addclass: 'alert bg-primary alert-styled-right',
            before_close: function(PNotify) {
                PNotify.update({
                    title: 'Error',
                    text: 'Uh oh. Now I\'ve become an error.',
                    addclass: 'alert bg-danger alert-styled-right',
                    type: 'error',
                    before_close: function(PNotify) {
                        PNotify.update({
                            title: 'Success',
                            text: 'I fixed the error!',
                            addclass: 'alert bg-success alert-styled-right',
                            type: 'success',
                            before_close: function(PNotify) {
                                PNotify.update({
                                    title: 'Info',
                                    text: 'Everything\'s cool now.',
                                    addclass: 'alert bg-info alert-styled-right',
                                    type: 'info',
                                    before_close: null
                                });
                                PNotify.queueRemove();
                                return false;
                            }
                        });
                        PNotify.queueRemove();
                        return false;
                    }
                });
                PNotify.queueRemove();
                return false;
            }
        });
    });


    // Progress loader
    $('#pnotify-progress').on('click', function () {
        var cur_value = 1,
        progress;

        // Make a loader.
        var loader = new PNotify({
            title: "Creating series of tubes",
            text: '<div class="progress progress-striped active" style="margin:0">\
            <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">\
            <span class="sr-only">0%</span>\
            </div>\
            </div>',
            addclass: 'bg-primary',
            icon: 'icon-spinner4 spinner',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            },
            before_open: function(PNotify) {
                progress = PNotify.get().find("div.progress-bar");
                progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");

                // Pretend to do something.
                var timer = setInterval(function() {
                    if (cur_value >= 100) {

                        // Remove the interval.
                        window.clearInterval(timer);
                        loader.remove();
                        return;
                    }
                    cur_value += 1;
                    progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
                }, 65);
            }
        });
    });


    // Dynamic loader
    $('#pnotify-dynamic').on('click', function () {
        var percent = 0;
        var notice = new PNotify({
            text: "Please wait",
            addclass: 'bg-primary',
            type: 'info',
            icon: 'icon-spinner4 spinner',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            opacity: .9,
            width: "170px"
        });

        setTimeout(function() {
        notice.update({
            title: false
        });
        var interval = setInterval(function() {
            percent += 2;
            var options = {
                text: percent + "% complete."
            };
            if (percent == 80) options.title = "Almost There";
            if (percent >= 100) {
                window.clearInterval(interval);
                options.title = "Done!";
                options.addclass = "bg-success";
                options.type = "success";
                options.hide = true;
                options.buttons = {
                    closer: true,
                    sticker: true
                };
                options.icon = 'icon-checkmark3';
                options.opacity = 1;
                options.width = PNotify.prototype.options.width;
            }
            notice.update(options);
            }, 120);
        }, 2000);
    });



    // Stacks
    // ------------------------------

    // Define directions
    var stack_top_left = {"dir1": "down", "dir2": "right", "push": "top"};
    var stack_bottom_left = {"dir1": "right", "dir2": "up", "push": "top"};
    var stack_bottom_right = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
    var stack_custom_left = {"dir1": "right", "dir2": "down"};
    var stack_custom_right = {"dir1": "left", "dir2": "up", "push": "top"};
    var stack_custom_top = {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 1};
    var stack_custom_bottom = {"dir1": "up", "dir2": "right", "spacing1": 1};


    //
    // Setup options for positions
    //

    // Top left
    function show_stack_top_left(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            addclass: "stack-top-left bg-primary",
            stack: stack_top_left
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-top-left bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-top-left bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-top-left bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }

    // Bottom left
    function show_stack_bottom_left(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            addclass: "stack-bottom-left bg-primary",
            stack: stack_bottom_left
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-bottom-left bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-bottom-left bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-bottom-left bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }

    // Bottom right
    function show_stack_bottom_right(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            addclass: "stack-bottom-right bg-primary",
            stack: stack_bottom_right
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-bottom-right bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-bottom-right bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-bottom-right bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }

    // Custom left position
    function show_stack_custom_left(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            addclass: "stack-custom-left bg-primary alert-styled-right",
            stack: stack_custom_left
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-custom-left bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-custom-left bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-custom-left bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }

    // Custom right position
    function show_stack_custom_right(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            addclass: "stack-custom-right bg-primary",
            stack: stack_custom_right
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-custom-right bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-custom-right bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-custom-right bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }

    // Custom top position
    function show_stack_custom_top(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            width: "100%",
            cornerclass: "no-border-radius",
            addclass: "stack-custom-top bg-primary",
            stack: stack_custom_top
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-custom-top bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-custom-top bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-custom-top bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }

    // Custom bottom position
    function show_stack_custom_bottom(type) {
        var opts = {
            title: "Over here",
            text: "Check me out. I'm in a different stack.",
            width: "100%",
            cornerclass: "no-border-radius",
            addclass: "stack-custom-bottom bg-primary",
            stack: stack_custom_bottom
        };
        switch (type) {
            case 'error':
            opts.title = "Oh No";
            opts.text = "Watch out for that water tower!";
            opts.addclass = "stack-custom-bottom bg-danger";
            opts.type = "error";
            break;

            case 'info':
            opts.title = "Breaking News";
            opts.text = "Have you met Ted?";
            opts.addclass = "stack-custom-bottom bg-info";
            opts.type = "info";
            break;

            case 'success':
            opts.title = "Good News Everyone";
            opts.text = "I've invented a device that bites shiny metal asses.";
            opts.addclass = "stack-custom-bottom bg-success";
            opts.type = "success";
            break;
        }
        new PNotify(opts);
    }


    //
    // Initialize
    //

    // Top left
    $('#pnotify-stack-top-left').on('click', function () {
        show_stack_top_left('primary');
    });

    // Bottom left
    $('#pnotify-stack-bottom-left').on('click', function () {
        show_stack_bottom_left('primary');
    });

    // Bottom right
    $('#pnotify-stack-bottom-right').on('click', function () {
        show_stack_bottom_right('danger');
    });

    // Custom left
    $('#pnotify-stack-custom-left').on('click', function () {
        show_stack_custom_left('success');
    });

    // Custom right
    $('#pnotify-stack-custom-right').on('click', function () {
        show_stack_custom_right('success');
    });

    // Custom top
    $('#pnotify-stack-custom-top').on('click', function () {
        show_stack_custom_top('info');
    });

    // Custom bottom
    $('#pnotify-stack-custom-bottom').on('click', function () {
        show_stack_custom_bottom('info');
    });

});
