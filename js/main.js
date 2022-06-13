var puntosCasa = 0;
var puntosJugador = 0;
var back;
var mazo;
var canHit = true;

function armarMazo() {
    const palos = ["C","D","H","S"];
    const valores = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    mazo = []

    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < valores.length; j++) {
            mazo.push(valores[j] + "-" + palos[i]);
        }
    }
}

function mezclarMazo() {
    for (let i = 0; i < mazo.length; i++) {
        let j = Math.floor(Math.random() * mazo.length);
        let temp = mazo[i];
        mazo[i] =  mazo[j];
        mazo[j] = temp;
    }
}

function getValor(carta, puntos) {
    let valorCarta = carta.split("-");
    let valor = valorCarta[0];

    if (isNaN(valor)) {
        if (valor == "A" && puntos < 11) {
            return 11;
        }
        else if (valor == "A" && puntos > 10) {
            return 1;
        }
        else {
            return 10;
        }
    }
        return parseInt(valor);
}

function jugar() {
    carta = mazo.shift();
    puntosJugador += getValor(carta, puntosJugador);

    carta = mazo.shift();
    puntosCasa += getValor(carta, puntosCasa);

    carta = mazo.shift();
    puntosJugador += getValor(carta, puntosJugador);

    back = mazo.shift();
    puntosCasa += getValor(back, puntosCasa);
}


/* function jugar() {

    let carta1 = parseInt(prompt("Ingrese el valor de su primera carta"));
    let carta2 = parseInt(prompt("Ingrese el valor de su segunda carta"));
    let puntos = carta1 + carta2;
    
    
    if (puntos === 21) {
        alert("BLACKJACK!!");
    } else {
    
        let sumar = prompt("Sus cartas suman " + puntos + " ¿Quiere otra carta? (Si o no)");
    
        while (sumar.toLowerCase() === "si" && puntos < 21) {
            let cartas = parseInt(prompt("Ingrese el valor de su siguiente carta"));
            puntos = puntos + cartas;
            if (puntos == 21) {
                alert("Sus cartas suman " + puntos )
                break
            }
            else if (puntos >21) {
                break;
            } else {
                sumar = prompt("Sus cartas suman " + puntos + " ¿Quiere otra carta? (Si o no)");
            }
        }
    
        if (puntos > 21) {
            alert("Se pasó de 21, la casa gana");
        } else {
            let casa1 = parseInt(prompt("Ingrese el valor de la primera carta de la casa"))
            let casa2 = parseInt(prompt("Ingrese el valor de la segunda carta de la casa"))
            let puntosCasa = casa1 + casa2;
    
            while (puntosCasa <17) {
                let casa = parseInt(prompt("La casa suma " + puntosCasa + " Ingrese el valor de la siguiente carta de la casa"))
                puntosCasa = puntosCasa + casa;
            }
    
            if (puntosCasa >21) {
                alert ("Felicitaciones, usted ganó")
            } else {
                if (puntos > puntosCasa) {
                    alert ("Felicitaciones, usted ganó")
                } else {
                    alert ("La casa gana")
                }
            }
        }
    
    }
    
    }
    
    
let newGame = "si";
    
alert("Bienvenido a la mesa de Blackjack")
    
while (newGame.toLowerCase() === "si") {
    jugar();
    newGame = prompt("¿Quiere volver a jugar? (Si o no)")
}

*/