(function($){



//make grid visiable
//start robot traker
$("a.activateRobot").on("click",function(event){
	event.preventDefault();
	var video =$("video");
	$("table").fadeIn(6000,function(){
		video.trigger("startTracking");
	});
	video[0].play();
	$(this).hide();
	
});

//clear last message
//get randomvideo
//Drop videos here!!!
$("body").on("reset",function(event){
	var videos =[
				"ui/berries_01.mp4",
				"ui/bow_01.mp4",
				"ui/ribbon_01.mp4",
				"ui/santa_01.mp4",
				"ui/yamaka_01.mp4"],
		randomNumber = Math.floor(Math.random()*10)%videos.length,
		video =document.getElementById("robotStream");

	$("table").hide();
	$(".message span").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	video.src =videos[randomNumber];

	$("a.activateRobot").show();
	$("td").removeClass("taken");
	$("table").trigger("newWord",[0]);

});

$("body").trigger("reset");

})(jQuery);