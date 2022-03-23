const prompt = require('prompt-sync')();
var _ = require('lodash');

turn_action = (nick, current_score, throws) => {
    console.log(current_score);
    console.log(throws);
    throws.forEach(th => {
        console.log(th)

        if (current_score === 0) {
            console.log(`${nick} queda con 0 puntos y gana el juego. ¡Felicitaciones Nick!`)
            process.exit();
        }
        else {
            if (th == 'DB') {
                current_score -= 50
            }
            else if (th == 'SB') {
                current_score -= 25
            }
            else {
                th = JSON.parse(th);
                current_score -= (th[0] * th[1])
            }
            if (current_score < 0) {
                current_score = Math.abs(current_score)
            }
            if (current_score === 0) {
                console.log(`${nick} queda con 0 puntos y gana el juego. ¡Felicitaciones Nick!`)
                process.exit();
            }
        }});
        
    console.log(`${nick} tiene ${current_score} puntos.`);
    return current_score
}

init_game = (...args) => {
    let players = [];
    console.log(args);
    args.forEach(arg => 
        players.push([arg, 501]));
    return players

}

play_game = (...args) => {
    players = init_game(...args)
    console.log(`Juego inicializado con jugadores ${players.map(player => player[0])}.`);
    console.log(players);
    recursive_turn(players);
}

recursive_turn = (players) => {
    new_players = [];
    players.map(player => {
        nick = player[0];
        current_score = player[1];
        console.log(`Ingrese el lanzamiento de ${nick}:`);
        new_score = turn_action(player[0], player[1], input_turn());
        new_players.push([nick, new_score]);
    });
    recursive_turn(new_players);
}

input_turn = () => {
    //El input tiene que ser de esta forma DB;[3,20];[3,19]
    var scores = prompt().split(';');
    //Escribir un checkeo que revise que el input sea correcto
    return scores
}

play_game("Juan", "Diego","Felipe");