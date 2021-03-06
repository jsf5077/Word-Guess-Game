var word = ["IRON*MAN", "CAPTAIN*AMERICA", "MIGHTY*THOR", "INCREDIBLE*HULK", "BLACK*WIDOW", "NICK*FURY", "HAWKEYE*"];
var wins = 0;
var losses = 0;
var lettersGuessed = "";
var endGame = false;
var endOfGame = 7;


//image variables 
var m = document.getElementById("iron-man");
var t = document.getElementById("thor");
var h = document.getElementById("hulk");
var c = document.getElementById("cap");
var f = document.getElementById("fury");
var e = document.getElementById("hawkeye");
var w = document.getElementById("widow");

m.style.display = "none";
t.style.display = "none";
h.style.display = "none";
c.style.display = "none";
f.style.display = "none";
e.style.display = "none";
w.style.display = "none";


//virtual buttons
letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

function renderLetters() {
    $("#buttons-view").empty();

    //create a for loop to generate buttons in the worday
    for (var i = 0; i < letters.length; i++) {

        //generate buttons for each play in the worday using jquery.
        var a = $("<button class='btn btn-dark btn-xs m-1'>");
        // Add a class
        a.addClass("playButton");
        // Add a data-attribute with a value of the play at index i
        a.attr("data-name", letters[i]);
        // Create the button's text with a value of the play at index i
        a.text(letters[i]);
        // Add the button to the HTML
        $("#buttons-view").append(a);
    }
}


// variables that hold references to places in the HTML

var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessText = document.getElementById("guesses-left");

 //internal tracking for wins and losses
 console.log("wins: " + wins);
 console.log("losses: " + losses);

// ***Start Game***
window.onload = function() {
    gameStart();
    renderLetters();

}

//Main Game Function
var gameStart = function() {
    
    //Declare Variables
    //computer picks a random name from word
    var computerChoice = Math.floor(Math.random()*endOfGame);
    var answer = word[computerChoice];
    var wordLength = answer.length;
    var display = [wordLength];
    var correct = wordLength - 1;
    var letters = answer.split('');
    var guessesLeft = wordLength + 5; 
    var output = "";
    var userLetter = "";
    console.log(word);

    // Initial external display for various html lines
    document.getElementById("directions-text").innerHTML = "Press any key to start";
    document.getElementById("victory").innerHTML = "";
    document.getElementById("nextRd").innerHTML = "";
    
    //intial console logs 
    console.log(answer);
    console.log("WordLength: "+wordLength);
    console.log("guesses left: "+guessesLeft);   

    //Declare an worday for variable lettersGuessed
    lettersGuessed = [];

    // External displays for wins, losses, and guesses left
    winsText.textContent = "Wins: " + wins;
    lossesText.textContent = "Losses: " + losses;
    guessText.textContent = "Guesses Left: " + guessesLeft;

    //run reset function to populate the game with the appropriate underscores/placeholders to the chosen word. 
    reset();

    // creates underscore placeholders for the length of chosen word
    function reset( ) {    
        for (var i=0; i < answer.length; i++) {
            //if the index value in answer equals * then displat three spaces.
            if (answer[i] === "*") {
                //then display three spaces.
                display[i] = "&nbsp; &nbsp; &nbsp;";
            }
            //otherwise 
            else {
                //display an underscore with a space
                display[i] = "_ &nbsp;";
            }
            // make output equal the the corresponding underscores and spaces from the for loop
            output = output + display[i];
        }    
    } 

    // inserts the output back to the div with game id
    document.getElementById("game").innerHTML = output;
    
    //initialize the letters-guessed id with two dashes before guesses get put in. 
    document.getElementById("letters-guessed").innerHTML= "--";

    //reset the output to equal nothing
    output ="";

    // ***user has to guess word***
    //function controls when key is pressed  
    document.onkeyup = function(event) {
        //follow is else statement for between games. a toss away key before keys log as guesses for the next game. 
        if(endGame) {
            gameStart();
            renderLetters();
            endGame = false;
            // update the html with the game id with the new output
            document.getElementById("game2").innerHTML = output;
        }
        else {
            //if key pressed matches a letter on the keyboard
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                //clears directions
                document.getElementById("directions-text").innerHTML = "";
                //reset victory html
                document.getElementById("victory").innerHTML = "";
                //clears next round text
                document.getElementById("nextRd").innerHTML = "";
                //variable userKey is equal to the letter pressed capitalized
                var userKey = event.key.toUpperCase();
                //output reset
                output = "";
                //global variable userLetter is set to equal local variable userKey
                userLetter = userKey;

                //for loop that runs for the length of answer
                for (var w=0; w < answer.length; w++) {
                    //if the key pressed by the user equals one of the letters in the answer
                    if (userLetter == letters[w]) {
                        //change the index at the same display to equal the user guess
                        display[w] = userLetter;
                        if (lettersGuessed.indexOf(userLetter) > -1) {
                            document.getElementById("guess-message").innerHTML = "you've already guessed this letter!"; 
                        }
                        else {
                        //subtract from letters remaining
                        correct--;
                        // gusesesLeft--;
                        console.log("letters remaining: " + correct);
                        }
                    }
                    //change output to the display index value obtained from the if statement
                    output = output + display[w] + " ";
                }
                if (lettersGuessed.indexOf(userLetter) > -1) {
                    return;
                }
                else {
                //subtract from letters remaining
                guessesLeft--;
                }
                // run winCalc function
                winCalc();
            }
            // update the html with the game id with the new output
        document.getElementById("game").innerHTML = output;
        }    
    }

    //this determines in the user has completed the game 
    function winCalc() {
        // if all the letters have been guessed
        if (correct < 1) {
            // display victory in html div id victory
            document.getElementById("victory").innerHTML = "YOU ARE VICTORIOUS";
            //update the wins variable by 1
            wins++;
            //update the wins in the html
            winsText.textContent = "Wins: " + wins;

            function endGameCheck () {
                endOfGame--;
                if (endOfGame === 0 ){
                    document.getElementById("victory").innerHTML = "AVENGERS ASSEMBLED! THANKS FOR PLAYING";
                    document.getElementById("nextRd").innerHTML = "Assembled!";
                }

            }
            
            //bonus
            if (answer==="IRON*MAN"){
                m.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "IRON*MAN") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();
            }

            else if (answer==="CAPTAIN*AMERICA"){
                c.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "CAPTAIN*AMERICA") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();
            }

            else if (answer==="MIGHTY*THOR"){
                t.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "MIGHTY*THOR") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();
            }

            else if (answer==="INCREDIBLE*HULK"){
                h.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "INCREDIBLE*HULK") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();
            }

            else if (answer==="BLACK*WIDOW"){
                w.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "BLACK*WIDOW") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();
            }

            else if (answer==="NICK*FURY"){
                f.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "NICK*FURY") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();
            }

            else if (answer==="HAWKEYE*"){
                e.style.display = "block";
                for( var i = 0; i < word.length; i++){ 
                    if ( word[i] === "HAWKEYE*") {
                      word.splice(i, 1); 
                    }
                }
                endGameCheck();

                 
            } //else if (endOfGame === 0 ){
            //     document.getElementById("victory").innerHTML = "AVENGERS ASSEMBLED! THANKS FOR PLAYING";
            // }
            //updates the value in the next round html
            document.getElementById("nextRd").innerHTML = "Press Any Key To Play Again.";
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                endGame = true;
            }
        }
        //If the user ran out of guesses left...
        else if (guessesLeft < 1) {
            //update the html id victory to say the user lost
            document.getElementById("victory").innerHTML = "YOU HAVE BEEN DEFEATED!";
            //update losses
            losses++;
            //display update to losses in html
            lossesText.textContent = "Losses: " + losses;
            //updates the value in the game html
            document.getElementById("game").innerHTML = output;
            // update the guesses left to override the fact that there is a * value in the index
            guessText.textContent = "Guesses Left: " + 0;
            document.getElementById("nextRd").innerHTML = "Press Any Key To Play Again.";
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                endGame = true;
            }
        }
        // if the user still has guesses and there are still letters to guess in the word...
        else {
            //update guesses left
            guessText.textContent = "Guesses Left: " + guessesLeft;
            console.log("Guesses Left: " + guessesLeft);
            // if user is guessing a letter already guessed
            if (lettersGuessed === userLetter) {
                //return nothing
                return;               
            }
            //otherwise...
            else {
            // run keyguessed function
            keyGuessed();
            // update the game html
            document.getElementById("game").innerHTML = output;
            }
        }
    } 

    //supposed to determine if a letter has already been guessed
    function keyGuessed() {
        //if the userletter matches any letter in the index of lettersGuessed...
        if (lettersGuessed.indexOf(userLetter) > -1) {
            // run for loop cycling through wordLength which is the same thing as answer.length    
            for (var s = 0; s < wordLength; s++) {
                // update html id guess-message to tell them theyve already guessed this letter
                document.getElementById("guess-message").innerHTML = "you've already guessed this letter!";                  
            }
        }
        // otherwise...
        else {
            // enter the letter guessed by the user into lettersGuessed worday
            lettersGuessed.push(userLetter);
            //update the html id, letters guessed, and clear guess message
            document.getElementById("letters-guessed").innerHTML = lettersGuessed.join(', ');
            console.log("Letters guessed: " + userLetter);
            document.getElementById("guess-message").innerHTML = "";
        }
    }
}
document.getElementById("play").addEventListener("click", function(){
    document.getElementById('audio').play();

});

document.getElementById("pause").addEventListener("click", function(){
    document.getElementById('audio').pause();
});



