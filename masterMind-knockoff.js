(function () {
    "use strict";
    const colorKey = [
        "blue", "yellow", "orange", "green", "pink", "brown"
    ];
    const hardColorKey = [
        ...colorKey, "olive", "purple", "grey", "lime", "cyan", "tan"
    ];
    //game help & description
    let help = document.getElementById("help");
    let helpEnabled = false;
    let description = document.getElementById("gameHelp");
    let removeHelp = document.getElementById("removeHelp");
    help.addEventListener("click", function (){
        description.style.display = "block";
        helpEnabled = true;
        if(helpEnabled){
            removeHelp.addEventListener("click", function (){
                description.style.display = "none";
                helpEnabled = false;
            });
        }
    });
    //game logic
    let sequence = [];
    let hardMode = document.getElementById("increaseDiff");
    let hard = false;
    let isHard = document.getElementById("isHardMode");
    let hardButtons = document.getElementsByClassName("hard");
    hardMode.addEventListener("click", function () {
        hard = true;
        hardMode.style.color = "#14bdeb";
        hardMode.style.background = "#0d151d";
        isHard.innerText = "Enabled";
        hardMode.disabled = true;
        for(let i = 0; i < hardButtons.length; i++){
            hardButtons[i].style.display = "inline-block";
        }
    });

    let won = false;
    let startGame = document.getElementById("newGame");
    let showSolution = document.getElementById("done");
    let gameWon = document.getElementById("winner");
    let count = 0;
    //answer key
    let answer1 = document.getElementById("key1");
    let answer2 = document.getElementById("key2");
    let answer3 = document.getElementById("key3");
    let answer4 = document.getElementById("key4");
    //assert button
    let assert = document.getElementById("submit");
    assert.disabled = true;
    // class selects
    let yourGuesses = document.getElementsByClassName("yourColor");
    let redResponses = document.getElementsByClassName("outputRed");
    for(let i = 0; i < redResponses.length; i++){
        redResponses[i].style.color = "red";
    }
    let whiteResponses = document.getElementsByClassName("outputWhite");
    for(let i = 0; i < whiteResponses.length; i++){
        whiteResponses[i].style.color = "white";
    }
    //your inputs
    let firstC = document.getElementsByClassName("c1");
    let secondC = document.getElementsByClassName("c2");
    let thirdC = document.getElementsByClassName("c3");
    let fourthC = document.getElementsByClassName("c4");
    //response
    let begin = document.getElementById("start");
    let response1 = document.getElementById("one");
    let response1W = document.getElementById("oneWhite");
    let response2 = document.getElementById("two");
    let response2W = document.getElementById("twoWhite");
    let response3 = document.getElementById("three");
    let response3W = document.getElementById("threeWhite");
    let response4 = document.getElementById("four");
    let response4W = document.getElementById("fourWhite");
    let response5 = document.getElementById("five");
    let response5W = document.getElementById("fiveWhite");
    let response6 = document.getElementById("six");
    let response6W = document.getElementById("sixWhite");
    let response7 = document.getElementById("seven");
    let response7W = document.getElementById("sevenWhite");
    let response8 = document.getElementById("eight");
    let response8W = document.getElementById("eightWhite");
    let response9 = document.getElementById("nine");
    let response9W = document.getElementById("nineWhite");
    let response10 = document.getElementById("ten");
    let response10W = document.getElementById("tenWhite");
    let newGame = document.getElementById("anotherRound");
    //game timer and game start
    let timer = document.getElementById("timer");
    let time = 0;
    let intervalID;
    function runTime() {
        time++;
    }
    startGame.addEventListener("click", function () {
        time = 0;
        intervalID = setInterval(runTime, 1000);
        assert.disabled = false;
        startGame.style.color = "#14bdeb";
        startGame.style.background = "#0d151d";
        if (hard) {
            for(let i = 0; i < 4; i++){
                let hardKey1 = Math.floor(Math.random() * hardColorKey.length - 1) + 1;
                sequence.push(hardColorKey[hardKey1]);
            }
        } else {
            for(let i = 0; i < 4; i++){
                let key1 = Math.floor(Math.random() * colorKey.length - 1) + 1;
                sequence.push(colorKey[key1]);
            }
        }
        for(let i = 0; i < buttonColors.length; i++){
            buttonColors[i].disabled = false;
        }
        begin.innerText = "Sequence Generated";
        startGame.disabled = true;
        hardMode.disabled = true;
        showSolution.addEventListener("click", function () {
            answer1.innerHTML = sequence[0];
            answer2.innerHTML = sequence[1];
            answer3.innerHTML = sequence[2];
            answer4.innerHTML = sequence[3];
            clearInterval(intervalID);
            timer.style.display = "block";
            for(let i = 0; i < buttonColors.length; i++){
                buttonColors[i].disabled = true;
            }
            for(let i = 0; i < spots.length; i++) {
                spots[i].style.backgroundColor = '#000000';
            }
            pickCount = 500;
        });
    });
    newGame.addEventListener("click", function(){
        window.location.reload();
    });

    let buttonColors = document.getElementsByClassName("selectors");
    let spots = document.getElementsByClassName("selectedColor");
    let pickCount = 0;
    let clearGuesses = document.getElementById("delete");
    clearGuesses.addEventListener("click", function (){
        if(guessSet.length > 0) {
            guessSet.pop();
            pickCount--;
            spots[pickCount].style.backgroundColor = "#232525"
        }
    });
    for(let i = 0; i < buttonColors.length; i++){
        buttonColors[i].disabled = true;
    }
    let guessSet = [];
    document.querySelectorAll(".selectors").forEach((btn) => btn.addEventListener("click", function() {
        spots[pickCount].style.backgroundColor = this.id.toString();
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push(this.id.toString());
        }
    }));

    assert.addEventListener("click", function(){
        assertGuess(count);
        count++;
        guessSet = [];
        pickCount = 0;
        for(let i = 0; i < spots.length; i++){
            spots[i].style.backgroundColor = "#0d151d";
        }
    });

    function reds(first, second, third, fourth, colorArr) {
        let rCRS = 0;
        if (first === colorArr[0]) {
            rCRS++;
        }
        if (second === colorArr[1]) {
            rCRS++;
        }
        if (third === colorArr[2]) {
            rCRS++;
        }
        if (fourth === colorArr[3]) {
            rCRS++;
        }
        if(rCRS === 4){
            won = true;
        }
        return rCRS + " Red";
    }

    function whites(first, second, third, fourth, colorArr) {
        let rCWS = 0;
        let firstIsRed = false;
        let secondIsRed = false;
        let thirdIsRed = false;
        let fourthIsRed = false;
        if (first === colorArr[0]) {
            colorArr = colorArr.join(" ").replace(first, "").split(" ");
            firstIsRed = true;
        }
        if (second === colorArr[1]) {
            colorArr = colorArr.join(" ").replace(second, "").split(" ");
            secondIsRed = true;
        }
        if (third === colorArr[2]) {
            colorArr = colorArr.join(" ").replace(third, "").split(" ");
            thirdIsRed = true;
        }
        if (fourth === colorArr[3]) {
            colorArr = colorArr.join(" ").replace(fourth, "").split(" ");
            fourthIsRed = true;
        }
        if (colorArr.indexOf(first) !== -1 && !firstIsRed) {
            rCWS++;
            colorArr = colorArr.join(" ").replace(first, "").split(" ");
        }
        if (colorArr.indexOf(second) !== -1 && !secondIsRed) {
            rCWS++;
            colorArr = colorArr.join(" ").replace(second, "").split(" ");
        }
        if (colorArr.indexOf(third) !== -1 && !thirdIsRed) {
            rCWS++;
            colorArr = colorArr.join(" ").replace(third, "").split(" ");
        }
        if (colorArr.indexOf(fourth) !== -1 && !fourthIsRed) {
            rCWS++;
            colorArr = colorArr.join(" ").replace(fourth, "").split(" ");
        }
        return rCWS + " White";
    }

    function assertGuess(){
        let newKey = sequence;
        let first = guessSet[0];
        let second = guessSet[1];
        let third = guessSet[2];
        let fourth = guessSet[3];
        if (count === 0) {
            response1.innerText = reds(first, second, third, fourth, newKey);
            response1W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 1) {
            response2.innerText = reds(first, second, third, fourth, newKey);
            response2W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 2) {
            response3.innerText = reds(first, second, third, fourth, newKey);
            response3W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 3) {
            response4.innerText = reds(first, second, third, fourth, newKey);
            response4W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 4) {
            response5.innerText = reds(first, second, third, fourth, newKey);
            response5W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 5) {
            response6.innerText = reds(first, second, third, fourth, newKey);
            response6W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 6) {
            response7.innerText = reds(first, second, third, fourth, newKey);
            response7W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 7) {
            response8.innerText = reds(first, second, third, fourth, newKey);
            response8W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 8) {
            response9.innerText = reds(first, second, third, fourth, newKey);
            response9W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 9) {
            response10.innerText = reds(first, second, third, fourth, newKey);
            response10W.innerText = whites(first, second, third, fourth, newKey);
        }
        firstC[count].innerHTML = first;
        firstC[count].style.color = guessSet[0];
        secondC[count].innerHTML = second;
        secondC[count].style.color = guessSet[1];
        thirdC[count].innerHTML = third;
        thirdC[count].style.color = guessSet[2];
        fourthC[count].innerHTML = fourth;
        fourthC[count].style.color = guessSet[3];
        if(won){
            clearInterval(intervalID);
            gameWon.style.display = "block";
            timer.style.display = "block";
            timer.innerHTML = `Solved in ${time} seconds`;
        }
    }
})();