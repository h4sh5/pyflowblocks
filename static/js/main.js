
var selectedBlock;
var selectActive = false;
var blockConfigShown = false;


$(document).ready(function() {

	function blockClick() {

     	if (!selectActive) {
			selectedBlock = $(this);
			console.log("selected block:",selectedBlock);
			selectActive = true;
			// $(this).prop("onclick", null).off("click");; 
			// temporarily disable callback on this
			$(".block").prop("onclick", null).off("click");
			$("#createbox").mousemove(followMouse); // track mouse movement within the div area


			$(this).toggleClass("selected");
			// use time out to make sure both clicks don't get registered/handled at the same time
			setTimeout(function() {$("#createbox").click(createBoxClick)} , 300);
			

     	}

     }

    $(".block").click(blockClick);

	function createBoxClick() {
		console.log("createbox click!");
		if (selectActive) {
			selectActive = false;
			$("#createbox").prop("mousemove", null).off("mousemove");  // clear mouse move callback
		
			console.log("deselected block:",selectedBlock);
			selectedBlock.toggleClass("selected");

			// disable createbox clicking
			$("#createbox").prop("onclick", null).off("click");
			//re-enable block selection, again with timeout so both clicks dont register at once
			setTimeout(function() {$(".block").click(blockClick)} , 300);

		}
	}




    function followMouse(event) {
   		// console.log(`${event.pageX} ${event.pageY}`)
   		selectedBlock.css({top: event.pageY, left: event.pageX});
    }

    function toggleBlockConfig(e){
  		// return false;
  		e.preventDefault();
  		if (event.which == 3) { // right mouse button
    		if (!blockConfigShown) {
    			$("#blockconfig").css({top: event.pageY, left: event.pageX});
	    		$("#blockconfig").show();
	    		blockConfigShown = true;

    		} else {
	    		$("#blockconfig").hide();
	    		blockConfigShown = false;
    		}
    		
    	}
    }


    // $(".block").click(function(event) {event.preventDefault()});
    $(".block").bind("contextmenu", toggleBlockConfig);

    $("#blockconfig").bind("contextmenu",function(e){
  		return false;
    });

    $("#selectedBlockInputs").change(function() {
    	createBlockInputOutputCircle($(this).val());

    });

    // $(".block").mousedown(function(event) {
    	

    function createBlockInputOutputCircle(numCircles) {
	 // create a circle for input output frontend display


	/*  HTML SVG Circle looks like:
	<svg height="100" width="100">
	   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
	 </svg> 

	jquery create example: http://stackoverflow.com/questions/12143106/ddg#12143240
		$("<div/>",{
		    "class" : "someelement",
		    // .. you can go on and add properties
		    "css" : {
		        "color" : "red"
		    },
		    "click" : function(){
		        alert("you just clicked me!!");
		    },
		    "data" : {
		       "foo" : "bar"
		    }
		}).appendTo("#container");


	*/
	
	circleSvg = $("<svg width=50 height=50>",{
		    "class" : "varcircle",
		    // .. you can go on and add properties
		    "css" : {
		        "color" : "red",
		        "position": "relative",
		        "top": 10 * numCircles,
		        "left": -20
		    }
		});

	// circleSvg.width(30);

	circleSvgCircle = $("<circle/>",{
		    // .. you can go on and add properties

		        "fill" : "red",
		        "stroke": "black",
		        "stroke-width":1,
		        "cx": 50,
		        "r": 40
		    
		});
	circleSvgCircle.appendTo(circleSvg);

	circleSvg.appendTo(selectedBlock);

	console.log("circle:",circleSvg);


}


});