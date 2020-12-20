(function () {
    "use strict";
    const colorKey = [
        "blue", "yellow", "darkorange", "green", "hotpink", "saddlebrown"
    ];
    const hardColorKey = [
        ...colorKey, "olivedrab", "purple", "dimgray", "lime", "tan"
    ];
    const expertKey = [
        ...hardColorKey, "cyan", "crimson", "aliceblue"
    ];

    function gameEnd(){
        clearInterval(intervalID);
        for(let i = 0; i < buttonColors.length; i++){
            buttonColors[i].disabled = true;
        }
        for(let i = 0; i < spots.length; i++) {
            spots[i].style.backgroundColor = '#000000';
        }
        assert.disabled = true;
        clear.disabled = true;
        pickCount = 500;
    }

    const postURL = "https://juniper-satisfying-cold.glitch.me/scores";
    function generateUser(name, mode, time, moves, arr){
        let ran = ~~(Math.random() * 80000);
        return {
            name: name ?? `RandomUser#${ran}`,
            mode,
            time: `${time} seconds`,
            moves,
            sequence: arr
        }
    }

    function render(userObj){
        return `<div id="gameUser">
                <h4>${userObj.name}</h4>
                <p>Game mode: ${userObj.mode}, solved in ${userObj.time} and ${userObj.moves} moves</p>
                <div id="leaderBoardSequence">
                    <p class="userSequence" id="${userObj.sequence[0]}"></p>
                    <p class="userSequence" id="${userObj.sequence[1]}"></p>
                    <p class="userSequence" id="${userObj.sequence[2]}"></p>
                    <p class="userSequence" id="${userObj.sequence[3]}"></p>
                </div>
            </div>`;
    }

    function addScore(userObj){fetch(postURL, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(userObj)}).then( r => r.json()).then( d => {return d.id;}).catch( err => console.error(err));}
    function remove(id){fetch(`${postURL}/${id}`, {method: "Delete", headers: {"Content-Type": "application/json"}}).then(r => r.json()).then( () => console.log(`deleted id ${id}`)).catch(err => console.error(err));}

    function renderSolution(arr){
        return `<div id="key"><span id="${arr[0]}"></span><span id="${arr[1]}"></span><span id="${arr[2]}"></span><span id="${arr[3]}"></span></div>`;
    }
    function runTime() {
        time++;
    }
    function trimRecord(arr){
        if(arr.length > 7){
            arr.length = 7;
        }
        return arr;
    }

    let intervalID;
    let user;
    let mode = "Normal";
    let helpEnabled = false;
    let won = false;
    let hard = false;
    let expert = false;
    let sequence = [];
    let guessSet = [];
    let pickCount = 0;
    let count = 0;
    let time = 0;
    const easyOptionsHTML = `<span class="blue">Blue</span>, <span class="brown">Brown</span>, <span class="yellow">Yellow</span>, <span class="orange">Orange</span>, <span class="green">Green</span>, <span class="pink">Pink</span>`;
    const justHardHTML = `<span class="grey">Grey</span>, <span class="olive">Olive</span>, <span class="tan">Tan</span>, <span class="purple">Purple</span>, and <span class="lime">Lime</span>`;
    const hardOptionsAddHTML = `<span class="grey">Grey</span>, <span class="olive">Olive</span>, <span class="tan">Tan</span>, <span class="purple">Purple</span>, <span class="lime">Lime</span>`;
    const expertOptionsHTML = `<span class="cyan">Cyan</span>, <span class="crimson">Crimson</span> and <span class="aliceblue">AliceBlue</span>`;
    let optionsList = document.getElementById("optionsList");
    let list = document.getElementById("otherColors");
    let startGame = document.getElementById("newGame");
    let hardMode = document.getElementById("increaseDiff");
    const hardButtons = document.getElementsByClassName("hard");
    const expertButtons = document.getElementsByClassName("expert");
    let assert = document.getElementById("submit");
    let clear = document.getElementById("delete");
    let timer = document.getElementById("timer");
    let firstC = document.getElementsByClassName("c1");
    let secondC = document.getElementsByClassName("c2");
    let thirdC = document.getElementsByClassName("c3");
    let fourthC = document.getElementsByClassName("c4");
    let spots = document.getElementsByClassName("selectedColor");
    let leaderBoardHTML = document.getElementById("fullLeaderBoard");
    assert.disabled = true;

    let redResponses = document.getElementsByClassName("outputRed");
    let whiteResponses = document.getElementsByClassName("outputWhite");
    let buttonColors = document.getElementsByClassName("selectors");
    for(let i = 0; i < redResponses.length; i++){
        redResponses[i].style.color = "red";
    }
    for(let i = 0; i < whiteResponses.length; i++){
        whiteResponses[i].style.color = "white";
    }
    for(let i = 0; i < buttonColors.length; i++){
        buttonColors[i].disabled = true;
    }

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

    hardMode.addEventListener("click", function () {
        hard = true;
        mode = "Hard";
        hardMode.style.color = "#14bdeb";
        hardMode.style.background = "#0d151d";
        $("#isHardMode").text("Hard Mode Enabled");
        for(let i = 0; i < hardButtons.length; i++){
            hardButtons[i].style.display = "inline-block";
        }
        hardMode.innerText = "Expert Mode";
        list.innerHTML = `<p>Expert Mode adds: <span class="cyan">Cyan</span>, <span class="crimson">Crimson</span> and <span class="aliceblue">AliceBlue</span></p>`;
        optionsList.innerHTML = `<p id="list"><strong>Options:</strong> ${easyOptionsHTML}, ${justHardHTML}</p>`;
        hardMode.addEventListener("click", function (){
                hard = false;
                expert = true;
                hardMode.style.color = "#d61717";
                for(let i = 0; i < expertButtons.length; i++){
                    expertButtons[i].style.display = "inline-block";
                }
                mode = "Expert";
                $("#isHardMode").text("Expert Mode Enabled");
                hardMode.disabled = true;
                list.style.display = "none";
                optionsList.innerHTML = `<p id="list"><strong>Options:</strong> ${easyOptionsHTML}, ${hardOptionsAddHTML}, ${expertOptionsHTML}</p>`;
            })

    });

    startGame.addEventListener("click", function () {
        time = 0;
        intervalID = setInterval(runTime, 1000);
        assert.disabled = false;
        startGame.disabled = true;
        hardMode.disabled = true;
        startGame.style.color = "#14bdeb";
        startGame.style.background = "#0d151d";
        for(let i = 0; i < buttonColors.length; i++){
            buttonColors[i].disabled = false;
        }
        for(let i = 0; i < spots.length; i++){
            spots[i].style.backgroundColor = "#16242c";
        }
        if(!hardMode){
            $("#increaseDiff").css("color", "#620113")
        }
        if(expert){
            for(let i = 0; i < 4; i++){
                let expertKey1 = ~~(Math.random() * expertKey.length -1) + 1;
                sequence.push(expertKey[expertKey1]);
            }
        } else if (hard) {
            for(let i = 0; i < 4; i++){
                let hardKey1 = ~~(Math.random() * hardColorKey.length - 1) + 1;
                sequence.push(hardColorKey[hardKey1]);
            }
        } else {
            for(let i = 0; i < 4; i++){
                let key1 = ~~(Math.random() * colorKey.length - 1) + 1;
                sequence.push(colorKey[key1]);
            }
        }
        $("#start").text("Sequence Generated");
        $("#done").on("click", function () {
            $("#answerLocation").html(renderSolution(sequence));
            gameEnd();
        });
    });

    $("#anotherRound").on("click", function(){
        window.location.reload();
    });

    clear.addEventListener("click", function (){
        if(guessSet.length > 0) {
            guessSet.pop();
            pickCount--;
            spots[pickCount].style.backgroundColor = "#232525"
        }
    });

    document.querySelectorAll(".selectors").forEach((btn) => btn.addEventListener("click", function() {
        if(guessSet.length < 4){
            spots[pickCount].style.backgroundColor = this.id.toString();
            pickCount++;
            guessSet.push(this.id.toString());
        }
    }));

    assert.addEventListener("click", function(){
        if(count < 10) {
            assertGuess(count);
            count++;
        }
        guessSet = [];
        pickCount = 0;
        for(let i = 0; i < spots.length; i++){
            spots[i].style.backgroundColor = "#0d151d";
        }
    });

    function reds(first, second, third, fourth, colorArr) {
        let rCRS = 0;
        if (first === colorArr[0]) rCRS++;
        if (second === colorArr[1]) rCRS++;
        if (third === colorArr[2]) rCRS++;
        if (fourth === colorArr[3]) rCRS++;
        if(rCRS === 4) won = true;
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
        firstC[count].innerHTML = `<p class="tableColors" id="${first}"></p>`;
        secondC[count].innerHTML = `<p class="tableColors" id="${second}"></p>`;
        thirdC[count].innerHTML = `<p class="tableColors" id="${third}"></p>`;
        fourthC[count].innerHTML = `<p class="tableColors" id="${fourth}"></p>`;
        if(won){
            gameWon();
            firstC[count].innerHTML = `<p class="tableColors winningGlow" id="${first}"></p>`;
            secondC[count].innerHTML = `<p class="tableColors winningGlow" id="${second}"></p>`;
            thirdC[count].innerHTML = `<p class="tableColors winningGlow" id="${third}"></p>`;
            fourthC[count].innerHTML = `<p class="tableColors winningGlow" id="${fourth}"></p>`;
        }
    }
    function gameWon(){
        gameEnd();
        let winningSequenceArr = Array.from($(".winningSequence"));
        timer.style.display = "block";
        timer.innerHTML = `Solved in ${time} seconds`;
        $("#leaderBoardModal").fadeIn(200);
        $("#solvedMoves").text(count + 1);
        for(let i = 0; i < winningSequenceArr.length; i++){
            winningSequenceArr[i].innerHTML = `<p class="leaderBoardButtonsDisplay" id="${sequence[i]}"></p>`;
        }
        $("#gameMode").text(mode);
        $("#post").on("click", function (){
            user = generateUser($("#name").val(), mode, time, count, sequence);
            $("#leaderBoardModal").fadeOut(200);
            addScore(user);
        });
    }
    $("#viewLeaderBoard").on("click", function(){
        fetchLeaderBoardData();
        const leaderBoard = $("#fullLeaderBoard");
        leaderBoard.css("display", "flex");
        leaderBoardHTML.innerHTML = `<p id="loadingScreen">Loading LeaderBoard</p><button id="closeLeaderBoard">X</button>`;
        $("#closeLeaderBoard").on("click", function () {
            $("#fullLeaderBoard").fadeOut(300);
        });
    });
    function fetchLeaderBoardData() {
        fetch(postURL).then(r => r.json()).then(d => {
            console.log(d);
            d = d.sort((a, b) => (parseFloat(a.time.split(" ")[0])) - (parseFloat(b.time.split(" ")[0])) > 0 ? 1 : -1);
            leaderBoardHTML.innerHTML = `<div id="leaderBoardInfo"><p>21 Best Scores</p><button id="closeLeaderBoard">X</button></div>`;

            const expertList = trimRecord(d.filter(d => d.mode === "Expert"));
            const hardList = trimRecord(d.filter(d => d.mode === "Hard"));
            const normalList = trimRecord(d.filter(d => d.mode === "Normal"));

            for (let i = 0; i < 21; i++) {
                if (d[i] !== undefined) {
                    leaderBoardHTML.insertAdjacentHTML("beforeend", render([...expertList, ...hardList, ...normalList][i]));
                }
            }
            $("#closeLeaderBoard").on("click", function () {
                $("#fullLeaderBoard").fadeOut(300);
            });
        });
    }

})();