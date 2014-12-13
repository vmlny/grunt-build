/*
	gets the words for the grid and updates it when called
*/
(function($){
	var url ='/ui/js/words2.json',
		words,success,error;

	$("table").on("newWord",function(event,index){
		var list =words[index],
		boxes =$("td"),
		repeatList=[],
		randomNumber;

		if(list){
			boxes.each(function(i,box){

				if(i!==4){//skip the bottom center box

					//get random number with in the list
					randomNumber = Math.floor((Math.random()*10*list.length)%list.length);
					while(repeatList.indexOf(randomNumber)>0){
						randomNumber = Math.floor((Math.random()*10*list.length)%list.length);
					}

					repeatList.push(randomNumber);					
					$(this).text(list[randomNumber]);
				}
			});
		}
	});

	success =function(obj, textStatus,jqXHR) {
		words =obj;
		$("table").trigger("newWord",[0]);
	};
	error = function(jqXHR, textStatus,errorThrown){
		debugger;
	};
	$.ajax({
			"url": url,
			"success":success,
			"error":error,
			"dataType": "json"
		});			

})(jQuery);