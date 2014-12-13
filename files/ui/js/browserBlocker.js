 var ua = window.navigator.userAgent;
 var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      window.location.href ="browserSupport.html";
    }

	if ('ontouchstart' in document.documentElement){
		window.location.href ="browserSupportNoMobile.html";
	}
//check touch for mobile and screen size
//chec