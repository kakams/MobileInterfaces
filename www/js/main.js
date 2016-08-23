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