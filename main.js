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

playerHash = (score) => player_name => [player_name, score];

function recursive_turn(players){
    // Generator
    
    return recursive_turn(Array.from(players, update_list));
}

function update_list(player){
    console.log(`Ingrese el lanzamiento de ${player[0]}:`);
    // Combinator
    return playerHash(turn_action(player[0], player[1], input_turn()))(player[0]);
}

function turn_action(player_name, old_score, throws){

    const new_score = throwsRecursion(throws, old_score);

    if (new_score === 0) {
        console.log(`${player_name} queda con 0 puntos y gana el juego. ¡Felicitaciones ${player_name}!`);
        process.exit();
    }

    console.log(`${player_name} tiene ${new_score} puntos.`);
    return new_score;
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

function input_turn(){
    //El input tiene que ser de esta forma DB;[3,20];[3,19]
    return prompt().split(';');
}

play_game("Juan", "Diego","Felipe");