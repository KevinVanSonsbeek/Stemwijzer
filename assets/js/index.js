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
    var body = document.getElementById("main");
    body.innerHTML =
        "<div class=\"w3-container\">" +
            "<p><button class=\"w3-button w3-black w3-round w3-large\" onclick=\"changeToQuestionScreen()\">Terug</button></p>\n " +
            "<h2>Uitslag:</h2>" +
            "<table id='myTable' class='w3-table w3-striped w3-border'>" +
                "<tr>" +
                    "<th>Partij</th>" +
                    "<th>Punten</th>" +
                "</tr>" +
            "</table>" +
        "</div>";

    var table = document.getElementById("myTable");

    for (var i = 0; i < parties.length; i++) { //Loop through and compare partie positions
        var row = table.insertRow(1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = parties[i].name;
        cell2.innerHTML = partiesList[parties[i].name];
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

    if(currentQuestion >= (subjects.length -1)) {//If last question reached
        console.dir(answers);
        changeToEndResultScreen();
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

    for (var a = 0; a < subjects.length; a++) { //Loop through questions

        for (var b = 0; b < subjects[a].parties.length; b++) { //Loop through and compare partie positions

            if ((answers[a] == "pro" && subjects[a].parties[b].position == "pro") || (answers[a] == "contra" && subjects[a].parties[b].position == "contra") || (answers[a] == "ambivalent" && subjects[a].parties[b].position == "ambivalent")) {
                partiesList[subjects[a].parties[b].name] += 1;
            }
        }

    }
}

function selectImportantQuestions() {

}

function selectPartiesToShow() {

}
