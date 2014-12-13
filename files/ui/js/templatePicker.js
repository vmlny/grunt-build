/**
	PICK UP EVENTS WHEN CLICK ON IMAGE ON CAROUSEL AND UPDATED USER SELECTION
*/
(function($){
	$(function(){
		$(".carouselList a").on("click",function(event){
			var img = $(this).find("img"),
				target = document.getElementById("selection");
				target.src = $(img).attr("src");
			event.preventDefault();

		});
	});
})(jQuery);