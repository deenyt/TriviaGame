

$( document ).ready(function() {
	// Questions with 4 choices and 1 answer  choices in a 2 dimensional array
	var questInfo =   {
		question: ["What is the Name of the Chin Bone?",
		"What is the Name of the Knee Bone?",
		"What is the Name of the Shin Bone?",
		"What is the Name of the Upper Arm Bone?",
		"What is the Name of the Thigh Bone?"],	
		questchoice: [
			["Jaundus","Womanable","Mandible","Clavicle"],
			["Patella","Radius","Ulna","Knebony"],
			["Sternum","Tibia","Stegasaurus","Cranium"],
			["Elbony","Clavicle","Humerus","Phallangie"],
			["Thius","Finger","Tibia","Femur"]],
		answer: [2,0,1,2,3]
	};
	// collect the number of correct and wrong answers in these variables		
	var score = {
		correctlyAnswer:  0,
		wrongAnswer: 0,
		numTimeElapsed: 0
	};

	var questCounter = 0;

	function startScreen(){
			//getAnotherQuestion();
		putUpAQuestion();

	}

	function clearMessagesBoxes () {
		stop();
		$("#question").empty(); 
		$("#choices").empty(); 
		$("#msg1").empty();
		$("#msg2").empty();
		$("#msg3").empty();
	}
	function resetGame() {
		
		$("#startAgainButton").hide();
		stop();
		clearMessagesBoxes(); 
		score.correctlyAnswer=  0;
		score.wrongAnswer= 0;
		score.timeElapsed = 0;  	
		questCounter = 0;
	}

	// ========================================================
	// ***********************************************************
	/*  display 1 question and 4 answer choices */
	function putUpAQuestion(){
		// start the clock
		number = 30;
		run();
		/* delete prior questions */
		$('#question').empty();
		document.getElementById("question").innerHTML = questInfo.question[questCounter];
		$('.choices').empty();
		for (var i = 0; i < 4; i++) {
		    var j = $('<button>');
		    j.addClass('choicesDisp'); //add a class to select on-click
		    j.attr('data-name',questInfo.questchoice[questCounter][i]); // Added a data-attribute
		    //j.attr('data-let', game.state[i]);
		    j.attr('data-index', i);
	   		j.text(questInfo.questchoice[questCounter][i]);
	   		$(".choices").append(j);
			//	 $('.choices').append("<p>"+j+"</p>");
			//		$('.choices').append(j);
			//$('.answers').append('<p>Choice Number 2</p>');    
		}
	}
	// ========================================================
	// This function displays how many correct or wrong or unanswered
	//    after all qustions have been gone through
	
	function dispResults(){
		clearMessagesBoxes();
		counter++;
		score.correctlyAnswer=  0;
		score.wrongAnswer= 0;
		score.timeElapsed = 0;	
		messNote1 = "Correctly Answered: " + score.correctlyAnswer;
		messNote2 = "Incorrectly Answered:" + score.wrongAnswer;
		messNote3 = "Unanswered:" + score.timeElapsed;
		$("#msg1").prepend(messNote1);
		$("#msg2").prepend(messNote2);
		$("#msg3").prepend(messNote3);
		$("#startAgainButton").show();
		
	}
	 
	function dispYourWrong() {
		clearMessagesBoxes();
		messNote1 = "INCORRECT  ";
		$("#msg1").append(messNote1);
		messNote2 = "The Correct Answer is: " + questInfo.questchoice[questCounter][questInfo.answer[questCounter]];
		$("#msg2").append(messNote2);
		number = 4;
		run();
		//pauseTime();
  		console.log('wrong answer');
  		//clearMessagesBoxes();
	}

	function dispYourCorrect(){
		clearMessagesBoxes();
		messNote1 = "CORRECT  ";
		$("#msg1").append(messNote1);
		messNote2 = "Yes, The Correct Answer is: " + questInfo.questchoice[questCounter][questInfo.answer[questCounter]];
		$("#msg2").append(messNote2);
		number = 4;
		run();
		//pauseTime();
		console.log('correct answer');
		//clearMessagesBoxes();
	}

	var number = 30;
	var counter;

	function pauseTime() {
		stop();
		setTimeout(function() {
      // Do something after 2 seconds
		}, 2000);
		for (var i = 0; i < 29999999; i++) {
		}
	}

	// The run function sets an interval
	// that runs the decrement function once a second.

	function run(){
		counter = setInterval(decrement, 1000);
	}

	// The decremeent function.
	function decrement(){
		// Decrease number by one.
		number--;
		// Show the number in the #show-number tag.
		$('#time-left').html('<h6>' + 'Time Remaining:  ' + number + '</h6>');

		// Once number hits zero...
		if (number === 0){
			// ...run the stop function.
			stop();
			//alert('Time Up!')


			// get another question  and update vars
    	}
	}

	// The stop function
	function stop(){
		// Clears our "counter" interval.
		// We just pass the name of the interval
		// to the clearInterval function.
		clearInterval(counter);
	}
	//  Start the Game
	$(document).on('click', '#startbutton', function() {
		$('#startbutton').empty();
		$("#startbutton").hide();
		console.log("instartbutton");
		startScreen();
	});
	//  Restart the Game
	$(document).on('click', '#startAgainButton', function() {
		$('#startAgainButton').empty();
		$("#startAgainButton").hide();
		console.log("in restartbutton");
		resetGame();
		putUpAQuestion();
	});
	// This function handles events where one button choice is clicked
	$(document).on('click', '.choicesDisp', function() {
		var guessIndex = $(this).data('index');
		
		// check if answer that was selected was correct
	    if (questInfo.answer[questCounter]  === guessIndex) {
	     	score.correctlyAnswer++;
	     	dispYourCorrect();
	     	alert ('your correct');
	     	//clearMessagesBoxes();

	    } else {
	    		score.wrongAnswer++;
	    		dispYourWrong();
	    		alert ('your wrong');
				//clearMessagesBoxes();
	    	}
	    	
	    if (questCounter < questInfo.question.length) {
	    
	    	questCounter++;
			console.log(questCounter);
	    	putUpAQuestion();
		}
		  else {   dispResults();  
		  }
		number = 4;
		run();
		//pauseTime();
	});

	// when first start, reset all the info and hide restart button
	resetGame();

});	


