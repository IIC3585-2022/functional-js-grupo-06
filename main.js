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

const compose = (f,g) => (x) => f(g(x))

input_turn = () => {
    //El input tiene que ser de esta forma DB;[3,20];[3,19]
    while (true) {
        var scores = prompt().split(';');
        if (hasThreeItems( scores )) {
            const numberPipe = compose(isList, hasTwoItems) //Compose
            var goodInputs = 0;
            scores.forEach(th => {
                if ( isLuckySHot(th)) {
                    goodInputs += 1;
                } else if (numberPipe(th)){
                    var points = th.replace("[", "").replace("]", "").replace(" ", "").split(',');
                    var goodThrow = 0;
                    points.forEach(number => {
                        if ( isNumberinRange(3, number) || isNumberinRange(20, number)){
                            goodThrow += 1;
                        }
                    })
                    if (goodThrow === 2){
                        goodInputs += 1;
                    }
                } else {
                    console.log("Error en", th,"Cada lanzamiento debe tener el formato '[1,2]', 'SB' o 'DB' ")
                }
            }) 
            if ( goodInputs === 3){
                break;
            }
        }
    }
    //Escribir un checkeo que revise que el input sea correcto
    return scores
}

hasThreeItems = ( scores ) => {
    if ( _.size(scores) === 3 ){          //lodash
        return scores
    } else {
        console.log("Su input debe tener el formato A;B;C");
        return false;
    }
}

isList = ( input ) => {
    if ( input[0] === '[' && _.last(input) === ']' ) {  // lodash
        return input;
    }
    return false;
} 

// _.isString( input )

isLuckySHot = ( th ) => {
    if ( th === "SB" || th === "DB") {
        return true;
    } else {
        return false;
    }
}

hasTwoItems = ( th ) => {
    if ( _.size(th.split(',')) === 2 ) {
        return th;
    } else {
        console.log("Error en", th,": Cada lanzamiento debe tener 2 elementos")
        return false;
    }
}

isNumberinRange = ( range, number ) => {
    if ( !isNaN(number)){
        if ( 1 <= Number(number) <= range) {
            return true;
        } else {
            console.log("Error en", number,": Ingreso un lanzamiento inválido en la casilla donde debería ir en el rango de 1 a " + range);
            return false;
        }
    } else {
        console.log("Error en", number,": Ambos items de cada lanzamiento deben ser números")
        return false;
    }
}

play_game("Juan", "Diego","Felipe");

