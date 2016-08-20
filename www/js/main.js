$(document).ready(function() {
	//listeners
  	
	
  	/*$('.css_menu li span').on('click', function(e) {
  	  	console.log('css_menu li');
  	  	console.log(e.target);
  	  	console.log(this);
  	  if (e.target !== this){
  	    return;
  	  }
  	});*/
	//listeners end 
  	
});
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

	$(overlay).css("display", "block");
	$(overlay).css("background-color", "rgba(0, 0, 0, 0.7)");
	
	$(menus).each(function(index){
		$(this).css("display", "block");
		$(this).css("transform", "scale(1)");
	});
}