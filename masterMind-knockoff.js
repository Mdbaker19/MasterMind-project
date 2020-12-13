(function () {
    "use strict";
    const colorKey = [
        "blue", "yellow", "orange", "green", "pink", "brown"
    ];
    const hardColorKey = [
        ...colorKey, "olive", "purple", "grey", "lime", "cyan", "tan"
    ];
    //game help & description
    let helpEnabled = false;
    $("#help").on("click", function (){
        $("#gameHelp").fadeIn(500);
        helpEnabled = true;
        if(helpEnabled){
            $("#removeHelp").on("click", function (){
                $("#gameHelp").fadeOut(250);
                helpEnabled = false;
            });
        }
    });
    //game logic
    let sequence = [];
    let hardMode = document.getElementById("increaseDiff");
    let hard = false;
    let mode = "Normal";
    let hardButtons = document.getElementsByClassName("hard");
    hardMode.addEventListener("click", function () {
        hard = true;
        mode = "Hard";
        hardMode.style.color = "#14bdeb";
        hardMode.style.background = "#0d151d";
        $("#isHardMode").text("Enabled");
        hardMode.disabled = true;
        for(let i = 0; i < hardButtons.length; i++){
            hardButtons[i].style.display = "inline-block";
        }
    });

    let won = false;
    let startGame = document.getElementById("newGame");
    let count = 0;
    //assert button
    let assert = document.getElementById("submit");
    assert.disabled = true;
    // class selects
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
        $("#start").text("Sequence Generated");
        startGame.disabled = true;
        hardMode.disabled = true;
        $("#done").on("click", function () {
            $("#key1").text(sequence[0]);
            $("#key2").text(sequence[1]);
            $("#key3").text(sequence[2]);
            $("#key4").text(sequence[3]);
            clearInterval(intervalID);
            for(let i = 0; i < buttonColors.length; i++){
                buttonColors[i].disabled = true;
            }
            for(let i = 0; i < spots.length; i++) {
                spots[i].style.backgroundColor = '#000000';
            }
            pickCount = 500;
        });
    });
    $("#anotherRound").on("click", function(){
        window.location.reload();
    });

    let buttonColors = document.getElementsByClassName("selectors");
    let spots = document.getElementsByClassName("selectedColor");
    let pickCount = 0;
    $("#delete").on("click", function (){
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
            $("#one").text(reds(first, second, third, fourth, newKey));
            $("#oneWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 1) {
            $("#two").text(reds(first, second, third, fourth, newKey));
            $("#twoWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 2) {
            $("#three").text(reds(first, second, third, fourth, newKey));
            $("#threeWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 3) {
            $("#four").text(reds(first, second, third, fourth, newKey));
            $("#fourWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 4) {
            $("#five").text(reds(first, second, third, fourth, newKey));
            $("#fiveWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 5) {
            $("#six").text(reds(first, second, third, fourth, newKey));
            $("#sixWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 6) {
            $("#seven").text(reds(first, second, third, fourth, newKey));
            $("#sevenWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 7) {
            $("#eight").text(reds(first, second, third, fourth, newKey));
            $("#eightWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 8) {
            $("#nine").text(reds(first, second, third, fourth, newKey));
            $("#nineWhite").text(whites(first, second, third, fourth, newKey));

        } else if (count === 9) {
            $("#ten").text(reds(first, second, third, fourth, newKey));
            $("#tenWhite").text(whites(first, second, third, fourth, newKey));
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
            gameWon();
        }
    }

    let user;
    let leaderBoardHTML = document.getElementById("fullLeaderBoard");
    function gameWon(){
        clearInterval(intervalID);
        timer.style.display = "block";
        timer.innerHTML = `Solved in ${time} seconds`;
        $("#leaderBoardModal").fadeIn(200);
        let winningSequenceArr = Array.from($(".winningSequence"));
        $("#solvedMoves").text(count + 1);
        for(let i = 0; i < winningSequenceArr.length; i++){
            winningSequenceArr[i].innerHTML = `<button class="leaderBoardButtonsDisplay" id="${sequence[i]}"></button>`;
        }
        $("#gameMode").text(mode);
        for(let i = 0; i < buttonColors.length; i++){
            buttonColors[i].disabled = true;
        }
        $("#post").on("click", function (){
            user = generateUser($("#name").val(), mode, time, count + 1);
            $("#leaderBoardModal").fadeOut(200);
            addScore(user);
        });
    }
    $("#viewLeaderBoard").on("click", function(){
        const leaderBoard = $("#fullLeaderBoard");
        leaderBoard.css("display", "flex");
        fetch(postURL).then( r => r.json()).then( d => {
            console.log(d);
            for(let i = 0; i < d.length; i++){
                leaderBoardHTML.insertAdjacentHTML("beforeend", render(d[i]));
            }
            $("#closeLeaderBoard").on("click", function () {
                $("#fullLeaderBoard").fadeOut(300);
            });
        })
    });

})();