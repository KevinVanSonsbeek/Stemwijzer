var currentQuestion = 0;
var answers = {};
var questionData = {};
var partieData = {};
var partiesList = {};

/**
 * Switches to screen showing questions
 */
function changeToQuestionScreen() {
    partiesList = {};
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("questionScreen").style.display = "inline";
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("importantQuestionsSelect").style.display = "none";

    //Load in question
    loadQuestion(currentQuestion);

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

    document.getElementById("startScreen").style.display = "inline";
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("partieOpinons").style.display = "none";

}

function changeToEndResultScreen() {
    calculatePartiePoints();
    var partieDisplayList = document.getElementById("partieDisplayList");

    document.getElementById("resultScreen").style.display = "inline";
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("showPartiesList").style.display = "none";

    console.log(partiesList);
    for (var i = 0; i < parties.length; i++) { //Loop through and compare partie positions
        // Add some text to the new cells:
        partieDisplayList.innerHTML += "<p>" + parties[i].name + ": " + partiesList[parties[i].name] + "</p>";
    }
}
/**
 * Changes title and statement in the DOM
 */
function loadQuestion(id) {
    document.getElementById("subjectTitle").innerHTML = subjects[id].title;
    document.getElementById("subjectStatement").innerHTML = subjects[id].statement;
    document.getElementById("partieOpinons").style.display = "none";
}

/**
 * Loads next question
 */
function nextQuestion(id, choice) {
    //Save choice for question in local storage
    answers[id] = choice;

    if(currentQuestion >= (subjects.length -1)) {//If last question reached
        showSelectImportantQuestions();
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
    var questionForm = document.getElementById("questionForm").elements;
    for (var i=0; i<questionForm.length; i++) {
        if (questionForm[i].type!="submit") {//we dont want to include the submit-buttom
            questionData[questionForm[i].name] = questionForm[i].checked;
        }
    }
    var partieForm = document.getElementById("partieForm").elements;
    for (var i=0; i<partieForm.length; i++) {
        if (partieForm[i].type!="submit") {//we dont want to include the submit-buttom
            partieData[partieForm[i].name] = partieForm[i].checked;
        }
    }

    partiesList = {};
    for(var i = 0; i < parties.length; i++) {
        partiesList[parties[i].name] = 0;
    }

    for (var a = 0; a < subjects.length; a++) { //Loop through questions

        for (var b = 0; b < subjects[a].parties.length; b++) { //Loop through and compare partie positions

            if ((answers[a] == "pro" && subjects[a].parties[b].position == "pro") || (answers[a] == "contra" && subjects[a].parties[b].position == "contra") || (answers[a] == "ambivalent" && subjects[a].parties[b].position == "ambivalent")) {

               if(questionData[subjects[a].title] == true) {
                   partiesList[subjects[a].parties[b].name] += 2;
               }else {
                   partiesList[subjects[a].parties[b].name] += 1;
               }
            }
        }

    }
}

function showSelectImportantQuestions() {
    document.getElementById("importantQuestionsSelect").style.display = "inline"
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("showPartiesList").style.display = "none";

    var questionsList = document.getElementById("questionsList");
    if(questionsList.innerHTML == "") {
        for(var i = 0; i < subjects.length; i++){
            questionsList.innerHTML += '<label><input type="checkbox" name="' + subjects[i].title + '"> ' + subjects[i].title + '</label><br>';
        }
    }

}

function showSelectParties() {
    document.getElementById("importantQuestionsSelect").style.display = "none";;
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("showPartiesList").style.display = "inline";

    var partiesForm = document.getElementById("partieList");
    if(partiesForm.innerHTML == "") {
        for(var i = 0; i < parties.length; i++){
            partiesForm.innerHTML += '<label><input type="checkbox" name="' + parties[i].name + '"> ' + parties[i].name + '</label><br>';
        }
    }
}
