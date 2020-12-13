const postURL = "https://juniper-satisfying-cold.glitch.me/scores";

function generateUser(name, mode, time, moves){
    let ran = ~~(Math.random() * 80000);
    return {
        name: name || `RandomUser#${ran}`,
        mode: mode,
        time: `${time} seconds`,
        moves: moves
    }
}

function render(userObj){
    return `<div id="gameUser">
                <h4>${userObj.name}</h4>
                <p>Game mode: ${userObj.mode}, solved in ${userObj.time} and ${userObj.moves} moves</p>
            </div>`;
}

function addScore(userObj){
    fetch(postURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
        .then( r => r.json())
        .then( d => {
           return d.id;
        })
        .catch( err => console.error(err));
}

function remove(id){
    fetch(`${postURL}/${id}`, {
        method: "Delete",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => r.json()).then( d => console.log(`deleted id ${id}`)).catch(err => console.error(err));
}