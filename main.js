const prompt = require('prompt-sync')();
const _ = require('lodash');

function play_game(...args) {
    // empezamos el juego con los jugadores correspondientes
    const players = init_game(...args);
    // iterator
    console.log(`Juego inicializado con jugadores ${players.map(player => player[0])}.`);
    console.log(players);
    // llamamos a los turnos recursivamente
    return recursive_turn(players);
}

function init_game(...args){
    // Currying
    const playerHash501 = playerHash(501);
    // Generator
    return Array.from(args, playerHash501);
}

playerHash = (score) => nick => [nick, score];

function recursive_turn(players){
    // Generator
    return recursive_turn( Array.from(players, update_list));
}

function update_list(hash){
    console.log(`Ingrese el lanzamiento de ${hash[0]}:`);
    // Combinator
    return playerHash(turn_action(hash[0], hash[1], input_turn()))(hash[0]);
}

function turn_action(nick, old_score, throws){

    const new_score = throwsRecursion(throws, old_score);

    if (new_score === 0) {
        console.log(`${nick} queda con 0 puntos y gana el juego. ¡Felicitaciones ${nick}!`);
        process.exit();
    }

    console.log(`${nick} tiene ${new_score} puntos.`);
    return new_score;
}

function input_turn(){
    //El input tiene que ser de esta forma DB;[3,20];[3,19]
    return prompt().split(';');
}

function throwsRecursion(throwArray, current_score){
    if ((current_score === 0) || (throwArray.length === 0)) return current_score;

    const th = _.head(throwArray);

    if (th == 'DB') {
        return throwsRecursion(_.tail(throwArray), current_score - 50);
    }
    else if (th == 'SB') {
        return throwsRecursion(_.tail(throwArray), current_score - 25);
    }
    else {
        const parsed_th = JSON.parse(th);
        return throwsRecursion(_.tail(throwArray), current_score - (parsed_th[0] * parsed_th[1]));
    }
}

play_game("Juan", "Diego","Felipe");