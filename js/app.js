
$(document).ready(function() {

	// create game reset function

	var questions = [{
        question: "Which Apollo mission landed the first humans on the Moon?",
        choices: ["Apollo 9", "Apollo 11", "Apollo 3", "Apollo 15"],
        answer: 1, 
        letter: "B",
        },
        {
        question: "The reactor at the site of the Chernobyl nuclear disaster is now in which country?",
        choices: ["Lithuania", "Russia","Ukraine", "Moldova"],
        answer: 2,
        letter: "C",
        },
        {
        question: "Which volcano is best known for its eruption in AD 79 that led to the destruction of the Roman cities of Pompeii and Herculaneum?",
        choices: ["Mount Vesuvius","Mount St. Helens", "Mount Etna", "Mount Pinatubo"],
        answer: 0,
        letter: "A",
        },
        {
        question: "What country has the largest japanese population outside of Japan?",
        choices: ["United States", "China", "Brazil", "Canada"],
        answer: 2,
        letter: "C",
        },
        {
        question: "Oceans hold what percentage of the Earth's surface water?",
        choices: ["55%","68%", "85%", "97%"],
        answer: 3,
        letter: "D",
    }]
   
    var numberCorrect = 0;
    var currentQuestion = 0;
    var numberLifeline = 0;
    var counter = 0;
    var finalCount;
    var timer;
    var wrongChoices = [];

    //grab buttons that are not correct. Stick them in an array
	//find function that randomly picks item from array
	//then add class and disable buttons. 


	function increaseOdds() {
		wrongChoices = questions[currentQuestion].choices.slice();
		for(var i=0; i < questions[currentQuestion].choices.length; i++) {
			if(i == questions[currentQuestion].answer) {
				correctChoice = wrongChoices.splice(i, 1);
			}
		}
		var rand = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
		console.log(rand);
		$()
	} 	
	function timer() {
		timer = setInterval(function () {
	    	counter++;
	    	$(".counter").text(counter);
		}, 1000);
	}
	function showModal(className) {
		$("." + className).addClass("show").removeClass("hide");
		$(".overlay-back").addClass("show").removeClass("hide");
	}
	
	function hideModal(className) {
		$("." + className).addClass("hide").removeClass("show");
		$(".overlay-back").addClass("hide").removeClass("show");
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
	    finalCount = counter;
	    clearTimeout(timer);
		$(".gameOver").append("<p>Number of correct answers: <span>" + numberCorrect + "</span> <br />Number of Life Lines Used: <span>" + numberLifeline + "</span><br />And it only took you <span>" + finalCount + "</span> seconds!</p>");
		
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
		if(currentQuestion < 5) {
			updateChoices();
		}
	}

	$('.getStarted button').on('click', function(){
		hideModal("getStarted");
		timer();
	});

	$(".answerDiv button").on('click', checkUserGuess);

	$(".help .expertLink").on('click', askExpert);

	$(".help .increaseOdds").on('click', increaseOdds);
	// Create newGame function after game ends to reset game. 

});
		
