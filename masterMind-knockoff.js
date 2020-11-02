(function () {
    "use strict";
    const colorKey = [
        "blue", "yellow", "orange", "green", "pink", "brown"
    ];
    const hardColorKey = [
        "blue", "yellow", "orange", "green", "pink", "brown",
        "olive", "purple", "grey", "lime", "cyan", "tan"
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
            })
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
    let newGame = document.getElementById("newGame");
    let done = document.getElementById("done");
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
    let restart = document.getElementById("link");
    let newText = document.getElementById("textCycle1");
    let gameText = document.getElementById("textCycle2");
    let restartCount = 0;
    //game timer and game start
    let timer = document.getElementById("timer");
    let time;
    function runTime() {
        time++;
        timer.innerText = time + " seconds";
    }
    newGame.addEventListener("click", function () {
        time = 0;
        setInterval(runTime, 1000);
        assert.disabled = false;
        newGame.style.color = "#14bdeb";
        newGame.style.background = "#0d151d";
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
        newGame.disabled = true;
        hardMode.disabled = true;
        done.addEventListener("click", function () {
            answer1.innerHTML = sequence[0];
            answer2.innerHTML = sequence[1];
            answer3.innerHTML = sequence[2];
            answer4.innerHTML = sequence[3];
            // timer.style.display = "block";
            for(let i = 0; i < buttonColors.length; i++){
                buttonColors[i].disabled = true;
            }
            for(let i = 0; i < spots.length; i++) {
                spots[i].style.backgroundColor = '#000000';
            }
            pickCount = 5;
        });
    });
    restart.addEventListener("click", function(){
        timer.style.display = "none";
        assert.disabled = true;
        count = 0;
        reloadGame(restartCount);
        restartCount++;
        for(let i = 0; i < spots.length; i++) {
            spots[i].style.backgroundColor = '#0d151d';
        }
        pickCount = 0;
    });
    const reloadGame = function(restartCount){
        if(restartCount % 2 === 0){
            newText.style.color = "#ff2e00";
            gameText.style.color = "#fffaff";
        } else {
            newText.style.color = "#fffaff";
            gameText.style.color = "#ff2e00";
        }
        textRestart();
        for(let i = 0; i < hardButtons.length; i++){
            hardButtons[i].style.display = "none";
        }
    }
    const textRestart = function(){
        hard = false;
        sequence = [];
        hardMode.disabled = false;
        newGame.disabled = false;
        gameWon.innerText = "";
        isHard.innerText = "";
        answer1.innerHTML = "--";
        answer2.innerHTML = "--";
        answer3.innerHTML = "--";
        answer4.innerHTML = "--";
        begin.innerText = "";
        hardMode.style.color = "#fffafb";
        hardMode.style.background = "#4d473d";
        newGame.style.color = "#fffafb";
        newGame.style.background = "#4d473d";
        for(let i = 0; i < redResponses.length; i++){
            redResponses[i].innerText = "";
        }
        for(let i = 0; i < whiteResponses.length; i++){
            whiteResponses[i].innerText = "";
        }
        for(let i = 0; i < yourGuesses.length; i++){
            yourGuesses[i].innerText = "..";
            yourGuesses[i].style.color = "#797b84";
        }
    }
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
    // for(let i = 0; i < buttonColors.length; i++){
    //     buttonColors[i].addEventListener("click", function (){
    //         spots[pickCount].style.backgroundColor = buttonColors[i].style.backgroundColor;
    //         pickCount++;
    //     });
    // }
    let guessSet = [];
    let blue = document.getElementById("blue");
    let brown = document.getElementById("brown");
    let yellow = document.getElementById("yellow");
    let orange = document.getElementById("orange");
    let green = document.getElementById("green");
    let pink = document.getElementById("pink");
    let grey = document.getElementById("grey");
    let cyan = document.getElementById("cyan");
    let olive = document.getElementById("olive");
    let tan = document.getElementById("tan");
    let purple = document.getElementById("purple");
    let lime = document.getElementById("lime");
    blue.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'blue';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("blue");
        }
    });
    brown.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = '#552a14';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("brown");
        }
    });
    yellow.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'yellow';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("yellow");
        }
    });
    orange.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'orange';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("orange");
        }
    });
    green.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'green';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("green");
        }
    });
    pink.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'pink';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("pink");
        }
    });
    grey.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'grey';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("grey");
        }
    });
    cyan.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'cyan';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("cyan");
        }
    });
    olive.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'olive';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("olive");
        }
    });
    tan.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'tan';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("tan");
        }
    });
    purple.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'purple';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("purple");
        }
    });
    lime.addEventListener("click", function (){
        spots[pickCount].style.backgroundColor = 'lime';
        pickCount++;
        if(guessSet.length < 4){
            guessSet.push("lime");
        }
    });

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
            colorArr = colorArr.join(" ").replace(first, "").split(" ");
        }
        if (second === colorArr[1]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(second, "").split(" ");
        }
        if (third === colorArr[2]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(third, "").split(" ");
        }
        if (fourth === colorArr[3]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(fourth, "").split(" ");
        }
        if(rCRS === 4){
            won = true;
        }
        return rCRS + " Red";
    }

    function whites(first, second, third, fourth, colorArr) {
        let rCRS = 0;
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
            gameWon.style.display = "block";
            // timer.style.display = "block";
        }
    }
})();