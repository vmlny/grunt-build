/**
This should add a single word to the card at each event
*/
(function($){
	$(function(){
		var modal =$(".modal");
		$(".card .message").on("addWord",function(event, word){
			var words = $(this).find("span"),
				i;
			for(i=0;i<words.length;i++){
				if($(words[i]).text().trim().length===0){
					$(words[i]).text(word);
					$("table").trigger("newWord",[i+1]);
					if(i===words.length-1){
						modal.trigger("showCard");
					}
					i=words.length;
				}
			}

		});
		modal.on("showCard",function(event){
			var img = document.getElementById("selection"),
				message = $(".message").text().trim().split("you"),
				canvas = document.getElementById('card')
				context = canvas.getContext("2d"),
				link = document.getElementById("download");


				context.drawImage(img,0,0);
				context.fillStyle="#fff";
				context.font ="30px Pacifico, cursive";
				context.fillText(message[0]+" you",20,50);
				context.fillText(message[1],40,150);
				context.save();

				link.download="yrHolidayCard.jpg";
				link.href = canvas.toDataURL();
		
				$(this).show();

		});
		$(".closeModal").on("click",function(event){
			modal.hide();
			$("body").trigger("reset");
		});
	});
})(jQuery);