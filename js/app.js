// Each question should be stored as a JavaScript object
// store your list of answers in an array.
//function timer() {
	//	var counter = 0;
	//	setInterval(function () {
	//		counter++;
	//	}, 1000);
	//	$(".counter").text(counter);
	//}

	
$(document).ready(function() {

	var questions = [{
        question: "Which Apollo mission landed the first humans on the Moon?",
        answer: "Apollo 11",
        qNum : 0, 
        },
        {
        question: "The reactor at the site of the Chernobyl nuclear disaster is now in which country?",
        answer: "Ukraine",
        qNum : 1,
        },
        {
        question: "Which volcano is best known for its eruption in AD 79 that led to the destruction of the Roman cities of Pompeii and Herculaneum?",
        answer: "Mount Vesuvius",
        qNum : 2,
        },
        {
        question: "What country has the largest japanese population outside of Japan?",
        answer: "Brazil",
        qNum : 3,
        },
        {
        question: "Oceans hold what percentage of the Earth's surface water?",
        answer: "97%",
        qNum : 4,
    }]
    

    var numberCorrect = 0;
    var currentQuestion = 0;
    var numberLifeline = 0;

	// Start game, go to first question
	$('.getStarted button').on('click', function(){
		$(".getStarted").css("display", "none");
		$(".overlay-back").css("display", "none");
		// Add function to start timer
	});


	$(".answerDiv a").on('click', checkUserGuess);

	$(".help .expertLink").on('click', askExpert);

	function askExpert() {
		$(".overlay-back").css("display", "inline");
	    $(".askExpert").css("display", "inline");
	    $(".expertAnswer").append(questions[currentQuestion].answer);
	  		
	    $(".okGary").on('click', function() {
		    $(".askExpert").css("display", "none");
		    $(".overlay-back").css("display", "none");
		});
		$(".expertLink").addClass("usedLifeLine");
	    numberLifeline++;
	}

	function gameOver() {
	    $(".gameOver").css("display", "inline");
		$(".gameOver").append("<p>You answered " + numberCorrect + " questions correct. </p><p>Number of Life Lines: " + numberLifeline + "</p>");
		$(".overlay-back").css("display", "inline");
	}

	function nextQuestion() {
		
		if (currentQuestion < 5) {
			$(".question h2").text(questions[currentQuestion].question);
			$(".q" + currentQuestion).css("display", "inline");
			$(".qNum").text(currentQuestion + 1);
		}
		else {
			gameOver();
		}
	}

	function correctAnwerMessage() {
		$(".correctAnswer").css("display", "inline");
		$(".overlay-back").css("display", "inline");
		setTimeout(function () {
		    $(".correctAnswer").css("display", "none");
		    $(".overlay-back").css("display", "none");
		     }, 2000);
	}

	function wrongAnswerMessage() {
		$(".wrongAnswer").css("display", "inline");
		$(".overlay-back").css("display", "inline");
		setTimeout(function () {
		    $(".wrongAnswer").css("display", "none");
		    $(".overlay-back").css("display", "none");
		     }, 2000);
	}

	function updateQuestionNumberCorrect() {
		$(".num" + currentQuestion).html("<i class='fa fa-trophy'></i>");
	}

	function updateQuestionNumberWrong() {
		$(".num" + currentQuestion).html("<i class='fa fa-thumbs-o-down'></i>");
	}

	function updateChoices() {
		$(".q" + currentQuestion).css("display", "none");
		currentQuestion++
		$(".q" + currentQuestion).css("display", "inline");
	}

	function checkUserGuess() {
		var userAnswer = $(this).find(".answer").text();
		if(userAnswer === questions[currentQuestion].answer) {
			correctAnwerMessage();
			updateQuestionNumberCorrect();
			numberCorrect++
		} else {
			wrongAnswerMessage();
			updateQuestionNumberWrong();
		}
		updateChoices();
		nextQuestion();
	}
	
});
		
