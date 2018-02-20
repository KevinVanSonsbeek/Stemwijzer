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

/**
 * Switch to end result screen
 */
function changeToEndResultScreen() {
    calculatePartiePoints();

    if(Object.keys(partiesList).length < 3) {
        alert("Selectuur a.u.b. minimaal 3 partijen!");
        return;
    }

    var partieDisplayList = document.getElementById("partieDisplayList");

    document.getElementById("resultScreen").style.display = "inline";
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("showPartiesList").style.display = "none";

    partieDisplayList.innerHTML = "";


    //Convert object to array and sort
    var sortedPartiesList = [];

    for (var partie in partiesList) {
        sortedPartiesList.push([partie, partiesList[partie]]);
    }

    sortedPartiesList.sort(function(a, b) {
        return b[1] - a[1];
    });

    for(partie in sortedPartiesList) {
        partieDisplayList.innerHTML += "<p>" + sortedPartiesList[partie][0] + "(" + partiesList[sortedPartiesList[partie][0]] + " punten)</p>";
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

    var proList = document.getElementById("partiesProList");
    var ambivalentList = document.getElementById("partiesAmbivalentList");
    var contraList = document.getElementById("partiesContraList");

    var proListText = "";
    var ambivalentListText = "";
    var contraListText = '';

    for(var i = 0; i < subjects[currentQuestion].parties.length; i++) {

        if(subjects[currentQuestion].parties[i].position === "pro")
            proListText += "<li><p><a onclick='toggleExplanationDisplay(\"" + subjects[currentQuestion].parties[i].name + "Explanation\")'>" + subjects[currentQuestion].parties[i].name + " <i class='fa fa-caret-down'></i></a></p> <p style='display:none;' id='" + subjects[currentQuestion].parties[i].name + "Explanation'>\"" + subjects[currentQuestion].parties[i].explanation + "\"</p></li>\n";
        if(subjects[currentQuestion].parties[i].position === "ambivalent")
            ambivalentListText += "<li><p><a onclick='toggleExplanationDisplay(\"" + subjects[currentQuestion].parties[i].name + "Explanation\")'>" + subjects[currentQuestion].parties[i].name + " <i class='fa fa-caret-down'></i></a></p> <p style='display:none;' id='" + subjects[currentQuestion].parties[i].name + "Explanation'>\"" + subjects[currentQuestion].parties[i].explanation + "\"</p></li>\n";

        if(subjects[currentQuestion].parties[i].position === "contra")
            contraListText += "<li><p><a onclick='toggleExplanationDisplay(\"" + subjects[currentQuestion].parties[i].name + "Explanation\")'>" + subjects[currentQuestion].parties[i].name + " <i class='fa fa-caret-down'></i></a></p> <p style='display:none;' id='" + subjects[currentQuestion].parties[i].name + "Explanation'>\"" + subjects[currentQuestion].parties[i].explanation + "\"</p></li>\n";

    }

    proList.innerHTML = proListText;
    ambivalentList.innerHTML = ambivalentListText;
    contraList.innerHTML = contraListText;

    var partieOpinions = document.getElementById("partieOpinons");

    if( partieOpinons.style.display === "none") {
        partieOpinons.style.display = "inline";
    } else {
        partieOpinons.style.display = "none";
    }


}


/**
 * Toggle display of partie explanation
 */
function toggleExplanationDisplay(id) {
    var explanation = document.getElementById(id);
    if(explanation.style.display === "none"){
        explanation.style.display = "inline";
    } else {
        explanation.style.display = "none";
    }


}

/**
 * Calculates points the parties get
 */
function calculatePartiePoints() {

    //Get checked boxes from questions form
    var questionForm = document.getElementById("questionForm").elements;
    for (var i=0; i<questionForm.length; i++) {
        if (questionForm[i].type!="submit") {//we dont want to include the submit-buttom
            questionData[questionForm[i].name] = questionForm[i].checked;
        }
    }


    //Get checked boxes from parties form
    var partieForm = document.getElementById("partieForm").elements;
    for (var i=0; i<partieForm.length; i++) {
        if (partieForm[i].type!="submit") {//we dont want to include the submit-buttom
            partieData[partieForm[i].name] = partieForm[i].checked;
        }
    }


    //Generate array with all parties
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

    //Remove parties that are not selected
    for(partie in partiesList) {
        if(partieData[partie] == false) {
            delete partiesList[partie];
        }
    }

}

/**
 * Shows screen where you can select important questions
 */
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

/**
 * Shows screen with parties you can choose to show
 */
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
