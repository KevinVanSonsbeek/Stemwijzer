var currentQuestion = 0;
var partiesList = {};
var answers = {};

/**
 * Switches to screen showing questions
 */
function changeToQuestionScreen() {

    partiesList = {};
    var startScreen = document.getElementById("startScreen");
    var questionScreen = document.getElementById("questionScreen");
    var resultScreen = document.getElementById("resultScreen");


    resultScreen.style.display = "none";
    startScreen.style.display = "none";
    questionScreen.style.display = "inline";

    //Load in question
    loadQuestion(currentQuestion);

    for(var i = 0; i < parties.length; i++) {
        partiesList[parties[i].name] = 0;
    }

    if(answers == "") {
        for(var i = 0; i < subjects.length; i++) {
            answers[i] = "";
        }
    }
}

/**
 * Switches to the mainscreen
 */
function changeToMainScreen() {

    var startScreen = document.getElementById("startScreen");
    var questionScreen = document.getElementById("questionScreen");
    var partieOpinions = document.getElementById("partieOpinons");

    startScreen.style.display = "inline";
    questionScreen.style.display = "none";
    partieOpinions.style.display = "none";

}

function changeToEndResultScreen() {
    calculatePartiePoints();
    var resultScreen = document.getElementById("resultScreen");
    var questionScreen = document.getElementById("questionScreen");

    var partieName = document.getElementById("partieName");
    var partiePoints = document.getElementById("partiePoints");

    partieName.innerHTML = "";
    partiePoints.innerHTML = "";


    resultScreen.style.display = "inline";
    questionScreen.style.display = "none";

    for (var i = 0; i < parties.length; i++) { //Loop through and compare partie positions
        // Add some text to the new cells:
        partieName.innerHTML += parties[i].name + "\n";
        partiePoints.innerHTML += partiesList[parties[i].name] + "\n";
    }
}
/**
 * Changes title and statement in the DOM
 */
function loadQuestion(id) {
    document.getElementById("subjectTitle").innerHTML = subjects[id].title;
    document.getElementById("subjectStatement").innerHTML = subjects[id].statement;
}

/**
 * Loads next question
 */
function nextQuestion(id, choice) {
    //Save choice for question in local storage
    answers[id] = choice;
    var partieOpinions = document.getElementById("partieOpinons");

    partieOpinions.style.display = "none";

    if(currentQuestion >= (subjects.length -1)) {//If last question reached
        console.dir(answers);
        selectImportantQuestions();
        //changeToEndResultScreen();
    }
    else {//Load next question
        currentQuestion = id + 1;
        loadQuestion(currentQuestion);
    }

}

/**
 * Loads previous question
 */
function previousQuestion(id) {
    var partieOpinions = document.getElementById("partieOpinons");

    partieOpinons.style.display = "none";
    if(currentQuestion == 0) {
        changeToMainScreen();
    }
    else {
        currentQuestion = id - 1;
        loadQuestion(currentQuestion);
    }
}

/**
 * Shows the table with parties positions on a question
 */
function showPartiesTable() {
    for(var i = 0; i < subjects[currentQuestion].parties.length; i++) {
        //console.log(subjects[currentQuestion].parties[i]);
    }

    if( partieOpinons.style.display == "none") {
        var partieOpinions = document.getElementById("partieOpinons");

        partieOpinons.style.display = "inline";
    } else {
        var partieOpinions = document.getElementById("partieOpinons");

        partieOpinons.style.display = "none";
    }


}

/**
 * Calculates points the parties get
 */
function calculatePartiePoints() {

    for (var a = 0; a < subjects.length; a++) { //Loop through questions

        for (var b = 0; b < subjects[a].parties.length; b++) { //Loop through and compare partie positions

            if ((answers[a] == "pro" && subjects[a].parties[b].position == "pro") || (answers[a] == "contra" && subjects[a].parties[b].position == "contra") || (answers[a] == "ambivalent" && subjects[a].parties[b].position == "ambivalent")) {
                partiesList[subjects[a].parties[b].name] += 1;
            }
        }

    }
}

function selectImportantQuestions() {
    var partiesForm = document.getElementById("partiesForm");
    for(var i = 0; i < subjects.length; i++){

        // var btn = document.createElement("INPUT");
        // btn.type = "checkbox";
        // var t = document.createTextNode("CLICK ME");
        // btn.appendChild(t);
        //
        // partiesForm.appendChild(btn);


        partiesForm.innerHTML += '<label><input type="checkbox" name="checkbox" value="value">' + subjects[i].title + '</label><br>';
    }

}

function selectPartiesToShow() {

}


function test() {
    selectImportantQuestions();
}
