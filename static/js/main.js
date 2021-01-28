
var selectedBlock;
var selectActive = false;

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

			// disable createbox clicking
			$("#createbox").prop("onclick", null).off("click");
			//re-enable block selection, again with timeout so both clicks dont register at once
			setTimeout(function() {$(".block").click(blockClick)} , 300);
			selectedBlock = null;
		}
	}




    function followMouse(event) {
   		// console.log(`${event.pageX} ${event.pageY}`)
   		selectedBlock.css({top: event.pageY, left: event.pageX});
    }



});