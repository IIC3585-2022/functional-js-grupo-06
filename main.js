const prompt = require('prompt-sync')();
var _ = require('lodash');

throwsRecursion = (throwArray, current_score) => {
    if ((current_score === 0) || (throwArray.length === 0)) return current_score

    const th = _.head(throwArray)

    if (th == 'DB') {
        new_score = current_score - 50
    }
    else if (th == 'SB') {
        new_score = current_score - 25
    }
    else {
        parsed_th = JSON.parse(th);
        new_score = current_score - (parsed_th[0] * parsed_th[1])
    }

    return throwsRecursion(_.tail(throwArray), new_score);
}

turn_action = (nick, current_score, throws) => {
    console.log(current_score);
    console.log(throws);
    console.log('holaaa');
    //Iterator

    new_score = throwsRecursion(throws, current_score)

    if (new_score === 0) {
        console.log(`${nick} queda con 0 puntos y gana el juego. ¡Felicitaciones ${nick}!`)
        process.exit();
    }

    console.log(`${nick} tiene ${new_score} puntos.`);
    return new_score
}

init_game = (...args) => {
    let players = [];
    console.log(args);
    //Iterator
    args.forEach(arg => 
        players.push(playerHash501(arg)));
        //Currying
    return players
}

playerHash = (score => (nick => [nick, score]))
playerHash501 = playerHash(501)



play_game = (...args) => {
    players = init_game(...args)
    console.log(`Juego inicializado con jugadores ${players.map(player => player[0])}.`);
    console.log(players);
    recursive_turn(players);
}


recursive_turn = (players) => {
    new_players = [];
    //Iterator
    players.map(player => {
        nick = player[0];
        current_score = player[1];
        console.log(`Ingrese el lanzamiento de ${nick}:`);
        //Combinator
        new_score = turn_action(player[0], player[1], input_turn());
        new_players.push(playerHash(new_score)(nick));
    });
    recursive_turn(new_players);
}

input_turn = () => {
    //El input tiene que ser de esta forma DB;[3,20];[3,19]
    var scores = prompt().split(';');
    console.log(scores);
    //Escribir un checkeo que revise que el input sea correcto
    return scores
}   

play_game("Juan", "Diego","Felipe")