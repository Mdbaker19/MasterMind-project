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