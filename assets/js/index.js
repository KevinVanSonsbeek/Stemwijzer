var currentQuestion = 0;
var partiesList = {};
localStorage.clear();
/**
 * Switches to screen showing questions
 */
function changeToQuestionScreen() {
    partiesList = {};
    var body = document.getElementById("main");
    body.innerHTML =
        "<div class=\"w3-container\">\n " +
            "<p><button class=\"w3-button w3-black w3-round w3-large\" onclick=\"previousQuestion(currentQuestion)\">Terug</button></p>\n " +
            "<h2 class=\"w3-center\" id='subjectTitle'></h2>" +
            "<p class=\"w3-center\" id='subjectStatement'></p>" +
            "<div class=\"w3-bar w3-center\">" +
                "<button class=\"w3-button w3-black w3-round w3-large\" onclick='nextQuestion(currentQuestion, \"pro\")'>Eens</button>" +
                "<button class=\"w3-button w3-black w3-round w3-large\" onclick='nextQuestion(currentQuestion, \"ambivalent\")'>Geen van Beide</button>" +
                "<button class=\"w3-button w3-black w3-round w3-large\" onclick='nextQuestion(currentQuestion, \"contra\")'>Oneens</button>" +
            "</div>" +
            "<br>" +
            "<div class=\"w3-bar w3-center\">" +
                "<button class=\"w3-button w3-blue w3-round w3-large\" onclick='showPartiesTable()'>Wat vinden de partijen?</button>" +
                "<button class=\"w3-button w3-gray w3-round w3-large\" onclick='nextQuestion(currentQuestion, \"none\")'>Sla vraag over</button>" +
            "</div>" +
            "<br>" +
        "</div>";

    loadQuestion(currentQuestion);

    for(var i = 0; i < parties.length; i++) {
        partiesList[parties[i].name] = 0;
    }
}

/**
 * Switches to the mainscreen
 */
function changeToMainScreen() {
    var body = document.getElementById("main");
    body.innerHTML = "<div class=\"w3-container w3-center\">\n <p> \n <button class=\"w3-button w3-black w3-round w3-xlarge\" onclick=\"changeToQuestionScreen()\">Start</button> \n </p> \n </div>";
}

function changeToEndResultScreen() {
    calculatePartiePoints();
    var body = document.getElementById("main");
    body.innerHTML =
        "<div class=\"w3-container\">" +
            "<p><button class=\"w3-button w3-black w3-round w3-large\" onclick=\"changeToQuestionScreen()\">Terug</button></p>\n " +
            "<h2>Uitslag:</h2>" +
        "</div>";

    for (var c = 0; c < parties.length; c++) { //Loop through and compare partie positions
        alertText += parties[c].name + ": " + partiesList[parties[c].name] + "\n";
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
function nextQuestion(id, choice) {//options: Pro, Contra, Ambivalent, none
    localStorage.setItem(id, choice);

    if(currentQuestion >= (subjects.length -1)) {
        changeToEndResultScreen();
    }
    else {
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
    console.log("WIP");
}

/**
 * Calculates points the parties get
 */
function calculatePartiePoints() {

    for (var a = 0; a < subjects.length; a++) { //Loop through questions

        for (var b = 0; b < subjects[a].parties.length; b++) { //Loop through and compare partie positions

            if ((localStorage[a] == "pro" && subjects[a].parties[b].position == "pro") || (localStorage[a] == "contra" && subjects[a].parties[b].position == "contra") || (localStorage[a] == "ambivalent" && subjects[a].parties[b].position == "ambivalent")) {
                partiesList[subjects[a].parties[b].name] += 1;
            }
        }

    }

    var alertText = "";
    for (var c = 0; c < parties.length; c++) { //Loop through and compare partie positions
        alertText += parties[c].name + ": " + partiesList[parties[c].name] + "\n";
    }

    alert(alertText);
}
