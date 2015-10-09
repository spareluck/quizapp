
$(document).ready(function() {

	//grab buttons that are not correct. Stick them in an array
	//find function that randomly picks item from array
	//then add class and disable buttons. 

	// Finish game over function
	// create game reset function
	// replace CSS additions in JS with classnames created in CSS

	
	var questions = [{
        question: "Which Apollo mission landed the first humans on the Moon?",
        choices: ["Apollo 9", "Apollo 11", "Apollo 3", "Apollo 15"],
        answer: 1, 
        letter: "B",
        qNum : 0, 
        },
        {
        question: "The reactor at the site of the Chernobyl nuclear disaster is now in which country?",
        choices: ["Lithuania", "Russia","Ukraine", "Moldova"],
        answer: 2,
        letter: "C",
        qNum : 1,
        },
        {
        question: "Which volcano is best known for its eruption in AD 79 that led to the destruction of the Roman cities of Pompeii and Herculaneum?",
        choices: ["Mount Vesuvius","Mount St. Helens", "Mount Etna", "Mount Pinatubo"],
        answer: 0,
        letter: "A",
        qNum : 2,
        },
        {
        question: "What country has the largest japanese population outside of Japan?",
        choices: ["United States", "China", "Brazil", "Canada"],
        answer: 2,
        letter: "C",
        qNum : 3,
        },
        {
        question: "Oceans hold what percentage of the Earth's surface water?",
        choices: ["55%","68%", "85%", "97%"],
        answer: 3,
        letter: "D",
        qNum : 4,
    }]
   
    var numberCorrect = 0;
    var currentQuestion = 0;
    var numberLifeline = 0;
    var counter = 0;
	
	function timer() {
		return setInterval(function () {
	    	counter++;
	    	$(".counter").text(counter);
		}, 1000);
	}

	// clearTimeout pass value returned by timer to start clock over
	 
	// Start game, go to first question
	$('.getStarted button').on('click', function(){
		hideModal("getStarted");
		timer();
	});


	$(".answerDiv button").on('click', checkUserGuess);

	$(".help .expertLink").on('click', askExpert);

	function showModal(className) {
		$("." + className).css("display", "inline");
		$(".overlay-back").css("display", "inline");	
	}

	//add css in style.css in class, then add class. Do not add css in JS
	
	function hideModal(className) {
		$("." + className).css("display", "none");
		$(".overlay-back").css("display", "none");
	}
	function askExpert() {
		var $expertLink = $(".expertLink");
	    showModal("askExpert");
	    $(".expertAnswer").append(questions[currentQuestion].letter + " " + questions[currentQuestion].choices[questions[currentQuestion].answer]);
	  		
	    $(".okGary").on('click', function() {
		    hideModal("askExpert");
		});
		$expertLink.addClass("usedLifeLine")
		$expertLink[0].disabled = true;
	    numberLifeline++;
	}

	function gameOver() {
	    showModal("gameOver");
		$(".gameOver").append("<p>Number of correct answers: " + numberCorrect + "</p><p>Number of Life Lines: " + numberLifeline + "</p>");
		// Add how many seconds player finished quiz in
		// Stop timer! 
		// Reset game after 5 seconds
	}

	function nextQuestion() {
		
		if (currentQuestion < 5) {
			$(".question h2").text(questions[currentQuestion].question);
			$(".qNum").text(currentQuestion + 1);
		}
		else {
			setTimeout(gameOver,2000);
		}
	}

	function correctAnwerMessage() {
		showModal("correctAnswer");
		setTimeout(function () {
		    hideModal("correctAnswer");
		}, 2000);
	}

	function wrongAnswerMessage() {
		showModal("wrongAnswer");
		setTimeout(function () {
		    hideModal("wrongAnswer");
		    }, 2000);
	}

	function updateQuestionNumberCorrect() {
		$(".num" + currentQuestion).html("<i class='fa fa-trophy'></i>");
	}

	function updateQuestionNumberWrong() {
		$(".num" + currentQuestion).html("<i class='fa fa-thumbs-o-down'></i>");
	}

	function updateChoices() {
		for(var i = 0; i < 4; i++) {
			$(".choice" + i).text(questions[currentQuestion].choices[i]);
		}	
	}

	function checkUserGuess() {
		var userAnswer = $(this).find(".text").text();
		if(userAnswer === questions[currentQuestion].choices[questions[currentQuestion].answer]) {
			correctAnwerMessage();
			updateQuestionNumberCorrect();
			numberCorrect++
		} else {
			wrongAnswerMessage();
			updateQuestionNumberWrong();
		}
		currentQuestion++
		nextQuestion();
		updateChoices();
	}
	
	// Create newGame function after game ends to reset game. 

});
		
