var puntosCasa = 0;
var puntosJugador = 0;
var back;
var mazo;
var acesJugador = 0;
var acesCasa = 0;
var balance;
var slider;
var max;
var apuesta;
var hoy;
var dia;
var ayer;

/* -------------------------------------------------------------------------- */
/*                   Funciones para armar y mezclar el mazo                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*            Funciones para repartir cartas y asignarles un valor            */
/* -------------------------------------------------------------------------- */

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
    cartaImg.classList.add("cartaJ")
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

/* -------------------------------------------------------------------------- */
/*                         Funcion que maneja el range                        */
/* -------------------------------------------------------------------------- */

function range() {    
    slider = document.getElementById("myRange");
    apuesta = document.getElementById("apuesta");
    slider.addEventListener("wheel", function (e) {
        if (e.deltaY < 0) {
            slider.valueAsNumber += 1;
        } else {
            slider.value -= 1;
        }
        apuesta.innerText = this.value;
        e.preventDefault();
        e.stopPropagation();
    })
    
    slider.oninput = function () {
        apuesta.innerText = this.value;
    }
    }

/* -------------------------------------------------------------------------- */
/*                                Boton apostar                               */
/* -------------------------------------------------------------------------- */

var btnApostar = document.getElementById("apostar");
btnApostar.addEventListener("click", apostar);

function apostar() {
    document.querySelector("#slidercontainer").hidden = true;
    document.querySelector("#apostar").hidden = true;
    document.querySelector("#parar").hidden = false;
    document.querySelector("#pedir").hidden = false;
    document.querySelector("#contenido").hidden = false;
    document.querySelector("#hagaApuesta").hidden = true;
    apuesta = slider.value;
    jugar();
}


/* -------------------------------------------------------------------------- */
/*                         Funcion que inicia el juego                        */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                 Boton pedir                                */
/* -------------------------------------------------------------------------- */

var btnPedir = document.getElementById("pedir");
btnPedir.addEventListener("click", pedir);

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

/* -------------------------------------------------------------------------- */
/*                                 Boton parar                                */
/* -------------------------------------------------------------------------- */

var btnParar = document.getElementById("parar");
btnParar.addEventListener("click", parar);

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
    setTimeout(resultado, 1000);
}

/* -------------------------------------------------------------------------- */
/*             Funcion que calcula el ganador y ajusta el balance             */
/* -------------------------------------------------------------------------- */

function resultado() {
    let cartelResultado = document.getElementById("resultado");
    let cartasJugador = document.getElementsByClassName("cartaJ");
    
    if (puntosJugador == 21 & cartasJugador.length == 2 & puntosCasa !== 21) {
        cartelResultado.innerText = "¡Blackjack!";
        balance += parseInt(apuesta) * 1.5;
        balance = Math.ceil(balance);
    } else if (puntosJugador > 21 || (puntosCasa > puntosJugador & puntosCasa < 22)) {
        cartelResultado.innerText = "La casa gana";
        balance -= parseInt(apuesta);
    } else if (puntosJugador == puntosCasa) {
        cartelResultado.innerText = "Es un empate";
    } else {
        cartelResultado.innerText = "¡Usted gana!";
        balance += parseInt(apuesta);
    }
    document.getElementById("balance").innerText = balance;
    if (balance !== 0) {
        document.querySelector("#volverAJugar").hidden = false;
    } else {
        apuesta = 0;
        document.getElementById("apuesta").innerText = apuesta;
    }
    max = document.getElementById("myRange");
    max.setAttribute("max", balance);
    apuesta.innerHTML = slider.value;

    document.querySelector("#resultado").hidden = false;

    localStorage.setItem("balance", balance);
}

/* -------------------------------------------------------------------------- */
/*                            Boton volver a jugar                            */
/* -------------------------------------------------------------------------- */

var btnVolverAJugar = document.getElementById("volverAJugar");
btnVolverAJugar.addEventListener("click", volverAJugar);

function volverAJugar() {
    balance = parseInt(localStorage.getItem("balance"));
    if (isNaN(balance)) {
        balance = 0
    }
    recompensa();

    let cartas = document.getElementsByTagName("img");
    while (cartas.length !== 0) {
        cartas[0].remove();
    }

    puntosCasa = 0;
    puntosJugador = 0;
    acesJugador = 0;
    acesCasa = 0;

    document.querySelector("#volverAJugar").hidden = true;
    document.querySelector("#parar").hidden = true;
    document.querySelector("#pedir").hidden = true;
    document.querySelector("#contenido").hidden = true;
    document.querySelector("#hagaApuesta").hidden = false;
    document.querySelector("#resultado").hidden = true;

    armarMazo();
    mezclarMazo();


    document.querySelector("#slidercontainer").hidden = false;
    document.querySelector("#apostar").hidden = false;

    document.getElementById("balance").innerText = balance;
    document.getElementById("apuesta").innerText = apuesta;

    apuesta = document.getElementById("apuesta");
    apuesta.innerText = document.getElementById("myRange").value;
    
}

volverAJugar();
range();

/* -------------------------------------------------------------------------- */
/*                              recompensa diaria                             */
/* -------------------------------------------------------------------------- */

function recompensa() {
fecha = new Date();
hoy = localStorage.setItem("hoy", fecha);
dia = parseInt(fecha.getDay());
ayer = parseInt(localStorage.getItem("ayer"));
if (dia !== ayer) {
    balance += 1000;
}
ayer = dia
localStorage.setItem("ayer", ayer)
}