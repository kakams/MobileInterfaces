$(document).ready(function() {
	//listeners
  	
	$(document).on('click', '.css_menu', function(e) {
  	  if (e.target !== this){
  	    return;
  	  }
	  var menu = $(this);
	  $(menu).hide();
  	  document.elementFromPoint(e.clientX, e.clientY).click();
	  $(menu).show();
  	});

	$(document).on('click', '.css_menu li', function(e) {
  	  if (e.target !== this){
  	    return;
  	  }
	  var menu = $(this).parent();
	  $(menu).hide();
  	  document.elementFromPoint(e.clientX, e.clientY).click();
	  $(menu).show();
  	});

	$(document).on('click','#menu_button_bg', function(e) {
	  if (e.target !== this){
	    return;
	  }
  	  var menu = $(this).parent();
  	  $(menu).hide();
    	  document.elementFromPoint(e.clientX, e.clientY).click();
  	  $(menu).show();
    });
  	$('#menu_button').on('click', function() {
  		togleMenu();
    });
  	
  	$('#menu #overlay').on('click', function() {
  		hideMenu();
  	});
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
	var overlay = $("#menu #overlay");
	if($(overlay).css("display") == "none"){
		showMenu();
	}
	else{
		hideMenu();
	}
}
function hideMenu(){
	var overlay = $("#menu #overlay");
	var menus = $("#menu > .css_menu");
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
	var overlay = $("#menu #overlay");
	var menus = $("#menu > .css_menu");

	$(overlay).css("display", "block");
	$(overlay).css("background-color", "rgba(0, 0, 0, 0.7)");
	
	$(menus).each(function(index){
		$(this).css("display", "block");
		$(this).css("transform", "scale(1)");
	});
}