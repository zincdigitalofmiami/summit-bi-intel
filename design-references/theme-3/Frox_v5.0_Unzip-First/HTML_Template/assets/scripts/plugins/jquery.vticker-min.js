/*!
 * jQuery Vertical News Ticker Plugin
 *
 * http://www.jugbit.com/jquery-vticker-vertical-news-ticker/
 * http://github.com/kasp3r/vTicker
 *
 * Copyright 2013 Tadas Juozapaitis
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
!function(e){e.fn.vTicker=function(i){i=e.extend({speed:700,pause:4e3,showItems:3,animation:"",mousePause:!0,isPaused:!1,direction:"up",height:0},i);return moveUp=function(i,n,t){if(!t.isPaused){var h=i.children("ul"),s=h.children("li:first").clone(!0);t.height>0&&(n=h.children("li:first").height()),h.animate({top:"-="+n+"px"},t.speed,(function(){e(this).children("li:first").remove(),e(this).css("top","0px")})),"fade"==t.animation&&(h.children("li:first").fadeOut(t.speed),0==t.height&&h.children("li:eq("+t.showItems+")").hide().fadeIn(t.speed).show()),s.appendTo(h)}},moveDown=function(i,n,t){if(!t.isPaused){var h=i.children("ul"),s=h.children("li:last").clone(!0);t.height>0&&(n=h.children("li:first").height()),h.css("top","-"+n+"px").prepend(s),h.animate({top:0},t.speed,(function(){e(this).children("li:last").remove()})),"fade"==t.animation&&(0==t.height&&h.children("li:eq("+t.showItems+")").fadeOut(t.speed),h.children("li:first").hide().fadeIn(t.speed).show())}},this.each((function(){var n=e(this),t=0;n.css({overflow:"hidden",position:"relative"}).children("ul").css({position:"absolute",margin:0,padding:0}).children("li").css({margin:0,padding:0}),0==i.height?(n.children("ul").children("li").each((function(){e(this).height()>t&&(t=e(this).height())})),n.children("ul").children("li").each((function(){e(this).height(t)})),n.height(t*i.showItems)):n.height(i.height);setInterval((function(){"up"==i.direction?moveUp(n,t,i):moveDown(n,t,i)}),i.pause);i.mousePause&&n.bind("mouseenter",(function(){i.isPaused=!0})).bind("mouseleave",(function(){i.isPaused=!1}))}))}}(jQuery);
//# sourceMappingURL=jquery.vticker-min.js.map