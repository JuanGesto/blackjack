var puntosCasa = 0;
var puntosJugador = 0;
var back;
var mazo;
var acesJugador = 0;
var acesCasa = 0;
var balance = 1000;
var apuesta = 0;

function armarMazo() {
    const palos = ["C", "D", "H", "S"];
    const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
}

function getValor(carta) {
    let valorCarta = carta.split("-");
    let valor = valorCarta[0];

    if (isNaN(valor)) {
        if (valor == "A") {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(valor);
}

function repartirJugador() {
    carta = mazo.shift();
    puntosJugador += getValor(carta);

    cartaImg = document.createElement("img");
    cartaImg.src = "./media/" + carta + ".svg";
    document.getElementById("cartas-jugador").append(cartaImg);

    if (getValor(carta) == 11) {
        acesJugador++;
    }
    if (puntosJugador > 21 && acesJugador > 0) {
        puntosJugador -= 10;
        acesJugador -= 1;
    }
}

function repartirCasa() {
    carta = mazo.shift();
    puntosCasa += getValor(carta);

    cartaImg = document.createElement("img");
    cartaImg.src = "./media/" + carta + ".svg";
    document.getElementById("cartas-casa").append(cartaImg);

    if (getValor(carta) == 11) {
        acesCasa++;
    }
    if (puntosCasa > 21 && acesCasa > 0) {
        puntosCasa -= 10;
        acesCasa -= 1;
    }
}

function jugar() {
    repartirJugador();
    repartirCasa();
    document.getElementById("puntos-casa").innerText = puntosCasa;
    repartirJugador();

    back = mazo.shift();
    puntosCasa += getValor(back);

    backImg = document.createElement("img");
    backImg.classList.add("back");
    backImg.src = "./media/BACK.png";
    document.getElementById("cartas-casa").append(backImg);

    if (getValor(carta) == 11) {
        acesCasa++;
    }
    if (puntosCasa > 21 && acesCasa > 0) {
        puntosCasa -= 10;
        acesCasa -= 1;
    }
    
    document.getElementById("puntos-jugador").innerText = puntosJugador;

    document.querySelector("#pedir").hidden = false;
    document.querySelector("#parar").hidden = false;

    if (puntosJugador > 20) {
        parar();
    }
}

function pedir() {
    repartirJugador();

    if (puntosJugador > 21 && acesJugador > 0) {
        puntosJugador -= 10;
        acesJugador -= 1;
    }

    document.getElementById("puntos-jugador").innerText = puntosJugador;

    if (puntosJugador > 20) {
        parar();
    }
}

function parar() {
    document.querySelector("#pedir").hidden = true;
    document.querySelector("#parar").hidden = true;

    backImg.remove();

    cartaImg = document.createElement("img");
    cartaImg.src = "./media/" + back + ".svg";
    document.getElementById("cartas-casa").append(cartaImg);
    document.getElementById("puntos-casa").innerText = puntosCasa;

    while (puntosCasa < 17) {
        repartirCasa();


        if (puntosCasa > 21 && acesCasa > 0) {
            puntosCasa -= 10;
            acesCasa -= 1;
        }

        document.getElementById("puntos-casa").innerText = puntosCasa;
    }
    resultado();
}

function resultado() {
    if (puntosJugador > 21 || (puntosCasa > puntosJugador & puntosCasa < 22)) {
        alert("La casa gana.");
        balance -= apuesta;
    } else if (puntosJugador == puntosCasa) {
        alert("Es un empate.");
    } else {
        alert("¡Usted gana!");
        balance += apuesta;
    }
    document.getElementById("balance").innerText = balance;
    if (balance !== 0) {
    document.querySelector("#volverAJugar").hidden = false;
    }
}

function reiniciar(){
    let cartas = document.getElementsByTagName("img");
    while (cartas.length !== 0) {
        cartas[0].remove();
    }

puntosCasa = 0;
puntosJugador = 0;
acesJugador = 0;
acesCasa = 0;
}

function volverAJugar() {
    reiniciar();
    document.querySelector("#volverAJugar").hidden = true;
    armarMazo();
    mezclarMazo();
    apuesta = parseInt(prompt("Ingrese su apuesta. Balance = " + balance));
    while (isNaN(apuesta) || apuesta >balance || apuesta <1) {
        alert("Debe ingresar un número valido")
        apuesta = parseInt(prompt("Ingrese su apuesta"));
    }
    jugar();

    document.getElementById("balance").innerText = balance;
    document.getElementById("apuesta").innerText = apuesta;
}

volverAJugar();