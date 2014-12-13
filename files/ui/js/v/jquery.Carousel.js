/**
Copyright 1992-2014 The FreeBSD Project. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE FREEBSD PROJECT ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE FREEBSD PROJECT OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the authors and should not be interpreted as representing official policies, either expressed or implied, of the FreeBSD Project.

Carousel that works with jquery 1.7.2

Relies heavily on CSS to make it work.

The General idea is that you have a carosusel class that wrappes everything and css hides any overflow.
Show only the current carousel item inside the carousel wrapper height and width and hide the rest
to the left and right outside of the edege of the wrapper using css positions absolute.

Use Jquery Animate to fly in the next/previse item

*/

(function($){
	$.fn.carousel =function(){
		//list of sides for the carousel
		var list = $(this).find(".carouselList li").each(function(){
			this.addEventListener('touchstart', handleTouchStart, false);
			this.addEventListener('touchmove', handleTouchMove, false);  
		}),
		//keep track of what to display
		current = list.length>0?0:null,
		next =	list.length>1?1:null,
		prev = list.length>=2?list.length-1:null,
		timer = $(this).data("millisecondsdelay"),
		//buttons
		nextButton = $(".carousel a.nextButton").on("click",function(e){
				e.preventDefault();
				skip = true;
				pause =false;
				goForward();
		}),
		backButton = $(".carousel a.backButton").on("click",function(e){
				e.preventDefault();
				skip =true;
				pause =false;
				goBack();
		}),
		pause = false,
		skip = false,
		// //Touch screen screens
		xDown,
		yDown,
		that =this,
		//for serveral slides you want to jump to a particular slide
		$pageContainer =$($(this).find(".pageContainer")),
		_createPages = function(){
			var i=0,
			page=null,
			//add handler to jump to a page
			pickPage = function(e){
				var pageNum = $(this).data("num");
				e.preventDefault();
				skip = true;
				pause =false;
				if((!pageNum&& pageNum!==0) || pageNum===current){
					return;
				}
				if(pageNum>current){
					goForward(pageNum);
				}else{
					goBack(pageNum);
				}
				$pageContainer.find("a").removeClass("current");
				$(this).addClass("current");
			};
			if(list.length<2){
				return;
			}
			//create each page to click on
			for(i=0;i<list.length;i++){
				page = $("<a href='' class='page' data-num='"+i+"'>"+i+"</a>").on("click",pickPage);
				if(i===0){
					page.addClass("current");
				}
				$pageContainer.append($("<li>").append(page));
			}
			//show the pages
			$pageContainer.show();
		}(),
		$pages = null,
		//animation check, do only one animation at a time
		isAnimating = false,
		//go back one slide
		goBack = function(pageNum){
			//2 animations, the old side and the new slide
			var runCounter = 2,
			checkRunning = function(){
				runCounter--;
				isAnimating = runCounter===0?false:true;
				if(!isAnimating){
					$(that).trigger("notAnimating");
				}
				$(list[next]).hide();
				$(list[prev]).hide();
			};

			pageNum = pageNum<list.length&&pageNum>=0?pageNum:prev;
			if(pageNum!==null && pageNum !== current && !isAnimating){
				isAnimating=true;
				$(that).trigger("animating");

				$(list[current]).css("left","0%").animate(	{"left":"100%"},500,"linear",checkRunning);
				$(list[pageNum]).css( {"left":"-100%","display":"inline-block"} ).animate(	{"left":"0%"},500,"linear",checkRunning);
				current = pageNum;
				next = current+1>=list.length?0:current+1;
				prev = current===0?list.length-1:current-1;


				_setPageMaker(current);
			}
		},
		//go forward one slide
		goForward = function(pageNum){
			//2 animations, the old side and the new slide
			var runCounter = 2,
			checkRunning = function(){
				runCounter--;
				isAnimating = runCounter===0?false:true;
				if(!isAnimating){
					$(that).trigger("notAnimating");
				}				
				$(list[next]).hide();
				$(list[prev]).hide();
			};

			pageNum = pageNum<list.length&&pageNum>=0?pageNum:next;
			if(pageNum!==null && pageNum !== current && !isAnimating){
				isAnimating=true;
				$(that).trigger("animating");

				$(list[current]).css("left","0%").animate(	{"left":"-100%"},500,"linear",checkRunning);
				$(list[pageNum]).css({"left":"100%","display":"inline-block"}).animate(	{"left":"0%"},500,"linear",checkRunning);
				current = pageNum;
				next = current+1>=list.length?0:current+1;
				prev = current===0?list.length-1:current-1;


				_setPageMaker(current);
			}
		},
		//set the page markers for the jump to slide
		_setPageMaker = function(pageNum){
			var $pages = $($pageContainer.find("a"));

			if(pageNum<0||pageNum>=list.length||pageNum===undefined){
				return;
			}

			$pages.removeClass("current");
			$($pages[pageNum]).addClass("current");

		};
		//for a single slide, don't show the buttons
		if(list.length<2){
			$(this).find(".carousel a.nextButton,.carousel a.backButton").hide();
		}
		//run carousel on a timer
		if(timer){
			setInterval(runTimer,timer);
		}
		function runTimer(){
			if(skip){
				skip = false;
			}else if(!pause){
				goForward();
			}
		};
		//listen to events
		$(this).on("pause",function(){
			pause = true;
		});
		$(this).on("resume",function(){
			pause = false;
		});

		//touch dectection
		function handleTouchStart(evt) {                                         
			    xDown = evt.touches[0].clientX;                                      
			    yDown = evt.touches[0].clientY;                                      
		};                                                

		function handleTouchMove(evt) {
		    if ( ! xDown || ! yDown ) {
		        return;
		    }

		    var xUp = evt.touches[0].clientX;                                    
		    var yUp = evt.touches[0].clientY;

		    var xDiff = xDown - xUp;
		    var yDiff = yDown - yUp;

		    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
		        if ( xDiff > 0 ) {
		            /* left swipe */ 
		            pause = true; //delay the time by one cycle
		            goForward();
		        } else {
		            /* right swipe */
		            pause = true; //delay the time by one cycle
		            goBack();
		        }                       
		    } else {
		        if ( yDiff > 0 ) {
		            /* up swipe */ 
		        } else { 
		            /* down swipe */
		        }                                                                 
		    }
		    /* reset values */
		    xDown = null;
		    yDown = null;                                             
		};			
		//keep the chaining.
		return this;
	};
}(jQuery));