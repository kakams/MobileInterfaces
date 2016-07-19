$(document).ready(function() {
	var abc = $('.drawer').drawer({
		  class: {
		    nav: 'drawer-nav',
		    toggle: 'drawer-toggle',
		    overlay: 'drawer-overlay',
		    open: 'drawer-open',
		    close: 'drawer-close',
		    dropdown: 'drawer-dropdown'
		  },
		  iscroll: {
		    mouseWheel: true,
		    preventDefault: false,
		    disableTouch: false
		  },
		  showOverlay: true
		});
});