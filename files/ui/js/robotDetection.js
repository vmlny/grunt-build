(function($){
	$(function(){
		$("video").on("startTracking",function(event){
			var 
				canvasWidth =205,
				canvasHeight =168,
				video =document.getElementById('robotStream'),
				area1 = document.createElement("canvas"),
				area2 = document.createElement("canvas"),
				area3 = document.createElement("canvas"),
				area4 = document.createElement("canvas"),
				area5 = document.createElement("canvas"),
				taget1 = {
							"id":1,
							"row":"1",
							"coloumn":"1",
							"x":10,
							"y":10,
							"area":area1.getContext("2d"),
							"found":false,
							"interval":null,
							"parsing":false,
							"debug":{
								"on":false,
								"canvas":document.getElementById("one")
							}
							
						},
				taget2 = {
							"id":2,							
							"row":"1",
							"coloumn":"2",
							"x":220,
							"y":10,							
							"area":area2.getContext("2d"),
							"found":false,
							"interval":null,
							"parsing":false,
							"debug":{
								"on":false,
								"canvas":document.getElementById("two")
							}							
						},
				taget3  = {
							"id":3,
							"row":"1",
							"coloumn":"3",
							"x":428,
							"y":10,							
							"area":area3.getContext("2d"),
							"found":false,
							"interval":null,
							"parsing":false,
							"debug":{
								"on":false,
								"canvas":document.getElementById("three")
							}							
						},
				taget4 = {
							"id":4,
							"row":"2",
							"coloumn":"1",
							"x":10,
							"y":175,							
							"area":area4.getContext("2d"),
							"found":false,
							"interval":null,
							"parsing":false,
							"debug":{
								"on":false,
								"canvas":document.getElementById("four")
							}							
						},
				taget5 = {
							"id":5,
							"row":"2",
							"coloumn":"3",
							"x":428,
							"y":175,							
							"area":area5.getContext("2d"),
							"found":false,
							"interval":null,
							"parsing":false,
							"debug":{
								"on":false,
								"canvas":document.getElementById("five")
							}
							
						},
				searchRate =2000,
				card =$(".card .message");

				area1.width=area2.width=area3.width=area4.width=area5.width=canvasWidth;
				area1.height=area2.height=area3.height=area4.height=area5.height=canvasHeight;
	
	

			function parseImage(target){
				var videoImg,i,red,green,blue,alpha,selector,context;

				if(target.found){
					clearInterval(target.interval);
				}else if(!target.found && !target.parsing){


					target.parsing =true;
					
					//grab section
					target.area.drawImage(video,target.x,target.y,canvasWidth,canvasHeight,0,0,canvasWidth,canvasHeight);
					videoImg=target.area.getImageData(0,0,canvasWidth,canvasHeight);

					// //debug
					if(target.debug.on){
						target.debug.canvas.width=canvasWidth;
						target.debug.canvas.height=canvasHeight;
						target.debug.canvas.getContext("2d").putImageData(videoImg,0,0);
					}
					//parse image
					for(i=0;i<videoImg.data.length;i+=32){
						red =videoImg.data[i];
						green =videoImg.data[i+1];
						blue =videoImg.data[i+2];		
						alpha =videoImg.data[i+3];

						//console.log(" red  = %o  green = %o  blue = %o",red, green, blue);
						if( (red <= 255 && red >= 140) &&
							(green <= 105 && green >= 0) &&
							(blue <= 97 && blue >= 0) 
							){
							i=videoImg.data.length;
							target.found =true;							
							clearInterval(target.interval);
							
							// console.log("FOUND RED!!!!");
							// console.log("i= %o  red  = %o  green = %o  blue = %o",i,red, green, blue);



							selector = "table tr:nth-child("+target.row+") td:nth-child("+target.coloumn+")";



							$(card).trigger("addWord",$(selector).addClass("taken").text());

						}			 		
					}
			 		target.parsing=false;					
					//update card

				}
			}
			taget1.interval = setInterval(function(){
				parseImage(taget1);
			},searchRate);

			taget2.interval = setInterval(function(){
				parseImage(taget2);
			},searchRate);

			taget3.interval = setInterval(function(){
				parseImage(taget3);
			},searchRate);

			taget4.interval = setInterval(function(){
				parseImage(taget4);
			},searchRate);

			taget5.interval = setInterval(function(){
				parseImage(taget5);
			},searchRate);
		});
	});
})(jQuery);