function desktopInfoBar(){
	var el;
	
	window.onresize = window.onscroll = function () {
		var upperleft = [window.pageXOffset,(window.pageYOffset)];
		var upperright = [(upperleft[0] + window.innerWidth),upperleft[1]];
		var zoomFactor = window.innerWidth/document.documentElement.clientWidth;
		if(typeof el === 'undefined' || el === null){
			el = $('#product_tf_desktop');
		}
		if(el !==null){
			var imageConteiner = $(el).find('.image_tf').first(); 
			var buttonConteiner = $(el).find('.button_tf_abort').first(); 
			var categoryDesc = $(el).find('.text_tf .category_tf_desc').first(); 
			var siteConteiner = $("#site_conteiner_desktop"); 
			var productName = $(el).find('.text_tf .product_tf_name .product_tf_name_cont').first(); 
			$(el).css('width', upperright[0] - upperleft[0] + 'px');
			$(el).css('left', upperleft[0] + 'px');
			$(el).css('top', upperleft[1] + 'px');
			$(el).css('height', parseInt(zoomFactor*50) + 'px');

			var barHeight = $(el).height();
			$(imageConteiner).css('width',barHeight+"px");
			$(buttonConteiner).css('width',barHeight+"px");
			$(imageConteiner).css('height',barHeight+"px");
			$(buttonConteiner).css('height',barHeight+"px");
			$(buttonConteiner).css('font-size',parseInt(zoomFactor*10)+"px");
			$(categoryDesc).css('font-size',parseInt(zoomFactor*13)+"px");
			$(categoryDesc).css('line-height',parseInt(zoomFactor*18)+"px");
			$(productName).css('font-size',parseInt(zoomFactor*15)+"px");
			$(productName).css('line-height',parseInt(zoomFactor*20)+"px");
			$(siteConteiner).css('margin-top', barHeight+"px");
		}
	}
	

	window.onresize();
}


function onAction(actions){
	var menuOpenSelectors = ".drawer-hamburger, .desktop_menu_open";
	var menuItemSelectors = ".drawer-menu-item, .drawer-dropdown-menu-item, .bar_navigation_tab, .desktop_menu_tab, .wachlarz_tab";
	

	$(document).on('click', menuItemSelectors, function(e){
		var action = createAction('tap_menu_item', e);
		actions.push(action);
	});
	$(document).on('click', function(e){
		var action = createAction('tap', e);
		actions.push(action);
	});

	$(document).on('click', '.drawer-menu-item', function(e){
		var action = createAction('tap', e);
		actions.push(action);
	});


	$(document).on('click', menuOpenSelectors , function(e){
		var action = createAction('menu_toggle', e);
		actions.push(action);
	});
	
	$(document).on('click', '#menu_button' , function(e){
		if (e.target !== this){
	  	    return;
	  	}
		var action = createAction('menu_toggle', e);
		actions.push(action);
	});
	
	$(document).on('scroll', function(e){ 
		clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {
			var action = createAction('scroll', e);
			actions.push(action);
	    }, 250));
	});

}
function createAction(type, e){
	var action = {};
	action.type = type;
	action.time =  new Date().getTime(); 
	action.screenWidth = window.innerWidth;
	action.screenHeight = window.innerHeight;
	
	if(e !== null && type !== 'scroll'){
		action.xPosition = e.pageX;
		action.yPosition = e.pageY - $(window).scrollTop(); //position on screen
	}
	return action;
}

function desktopMenuHover(){
	$(document).on('click', '.main_menu', 
		function(){
			if($(this).hasClass('hover')){
				$(this).removeClass('hover');
			}
			else{
				$(".main_menu").each(function(){
					$(this).removeClass("hover");
				});
				
				$(this).addClass('hover');
			}
		}
	);
	
}

function togleMenu(){
	var overlay = $("#menu_wachlarz #overlay");
	if($(overlay).css("display") == "none"){
		showMenu();
	}
	else{
		hideMenu();
	}
}
function hideMenu(){
	var overlay = $("#menu_wachlarz #overlay");
	var menus = $("#menu_wachlarz > .css_menu");
	var menuButtonBg = $("#menu_button_bg");
	
	$(menuButtonBg).removeClass('open');
	
	$(overlay).css("background-color", "rgba(0, 0, 0, 0)");
	setTimeout(function(){
		$(overlay).css("display", "none");
	}, 400);
	$(menus).each(function(index){
		$(this).css("transform", "scale(0)");
		setTimeout(function(){
			$(this).css("display", "none");
		}, 400);
	});
}
function showMenu(){
	var overlay = $("#menu_wachlarz #overlay");
	var menus = $("#menu_wachlarz > .css_menu");
	var menuButtonBg = $("#menu_button_bg");
	
	$(menuButtonBg).addClass('open');
	
	$(overlay).css("display", "block");
	$(overlay).css("background-color", "rgba(0, 0, 0, 0.7)");
	
	$(menus).each(function(index){
		$(this).css("display", "block");
		$(this).css("transform", "scale(1)");
	});
}