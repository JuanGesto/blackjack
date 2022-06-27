let puntosCasa = 0;
let puntosJugador = 0;
let back;
let mazo;
let acesJugador = 0;
let acesCasa = 0;
let balance;
let slider;
let max;
let apuesta;
let hoy;
let dia;
let ayer;

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
    cartaImg.classList.add("cartaC")
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
    max = document.getElementById("myRange");
    max.setAttribute("max", balance);
    }

/* -------------------------------------------------------------------------- */
/*                                Boton apostar                               */
/* -------------------------------------------------------------------------- */

let btnApostar = document.getElementById("apostar");
btnApostar.addEventListener("click", apostar);

function apostar() {
    document.querySelector("#slidercontainer").hidden = true;
    document.querySelector("#apostar").hidden = true;
    document.querySelector("#parar").hidden = false;
    document.querySelector("#pedir").hidden = false;
    document.querySelector("#contenido").hidden = false;
    document.querySelector("#hagaApuesta").hidden = true;
    apuesta = slider.value;
    balance -= apuesta
    document.getElementById("balance").innerText = balance;
    localStorage.setItem("balance", balance);
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

let btnPedir = document.getElementById("pedir");
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

let btnParar = document.getElementById("parar");
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
let cartelResultado;
let cartasJugador;
let cartasCasa;
let blackjackJugador;
let blackjackCasa;
function resultado() {
    cartelResultado = document.getElementById("resultado");
    cartasJugador = document.getElementsByClassName("cartaJ");
    cartasCasa= document.getElementsByClassName("cartaC");
    blackjackJugador = false;
    blackjackCasa = false;
    if (puntosJugador === 21 & cartasJugador.length === 2) {
        blackjackJugador = true;
    }
    if (puntosCasa === 21 & cartasCasa.length === 1) {
        blackjackCasa = true;
    }
    if (blackjackJugador === true & blackjackCasa != true) {
        cartelResultado.innerText = "¡Blackjack!";
        balance += parseInt(apuesta) * 2.5;
        balance = Math.ceil(balance);
    } else if (puntosJugador > 21 || (puntosCasa > puntosJugador & puntosCasa < 22) || (blackjackCasa === true & blackjackJugador != true)) {
        cartelResultado.innerText = "La casa gana";
    } else if (puntosJugador == puntosCasa) {
        cartelResultado.innerText = "Es un empate";
        balance += parseInt(apuesta);
    } else {
        cartelResultado.innerText = "¡Usted gana!";
        balance += parseInt(apuesta) * 2;
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

let btnVolverAJugar = document.getElementById("volverAJugar");
btnVolverAJugar.addEventListener("click", volverAJugar);

function volverAJugar() {
    balance = parseInt(localStorage.getItem("balance"));
    if (isNaN(balance)) {
        balance = 1000;
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

    if (balance === 0) {
    apuesta = 0;
    document.getElementById("apuesta").innerText = apuesta;
    btnApostar.setAttribute("disabled", true);
} else {
    btnApostar.removeAttribute("disabled");
}
}

/* -------------------------------------------------------------------------- */
/*                              recompensa diaria                             */
/* -------------------------------------------------------------------------- */
let btnAbrirRecompensa = document.getElementById("abrirRecompensa");
btnAbrirRecompensa.addEventListener("click", abrirRecompensa);
function abrirRecompensa() {
    document.querySelector("#ventana-recompensa").hidden = false
}
let btnCerrarRecompensa = document.getElementById("cerrarRecompensa");
btnCerrarRecompensa.addEventListener("click", cerrarRecompensa);
function cerrarRecompensa() {
    document.querySelector("#ventana-recompensa").hidden = true;
}
let btnReclamar = document.getElementById("reclamar");
btnReclamar.addEventListener("click", reclamar);

function reclamar() {
    balance += 1000;
    document.getElementById("balance").innerText = balance;
    localStorage.setItem("balance", balance);
    localStorage.setItem("reclamar", 0)
    btnReclamar.setAttribute("disabled", true);
}

function recompensa() {
fecha = new Date();
dia = parseInt(fecha.getDay());
hoy = localStorage.setItem("hoy", dia);
ayer = parseInt(localStorage.getItem("ayer"));
if (isNaN(ayer)) {
    btnReclamar.setAttribute("disabled", true);
    localStorage.setItem("reclamar", 0);
} else if (dia == localStorage.getItem("ayer")) {
    if (localStorage.getItem("reclamar") == 1) {
        btnReclamar.removeAttribute("disabled");
        } else {
            btnReclamar.setAttribute("disabled", true);
        }
} else {
    btnReclamar.removeAttribute("disabled");
    localStorage.setItem("reclamar", 1);
}
ayer = dia
localStorage.setItem("ayer", ayer)
}

/* -------------------------------------------------------------------------- */
/*                                   Reglas                                   */
/* -------------------------------------------------------------------------- */

let btnReglas = document.getElementById("abrirReglas");
btnReglas.addEventListener("click", abrirReglas);
function abrirReglas() {
    document.querySelector("#ventana-reglas").hidden = false
}

let btnCerrarReglas = document.getElementById("cerrarReglas");
btnCerrarReglas.addEventListener("click", cerrarReglas);
function cerrarReglas() {
    document.querySelector("#ventana-reglas").hidden = true;
}

/* -------------------------------------------------------------------------- */
/*                                   musica                                   */
/* -------------------------------------------------------------------------- */

let song = new Audio("./media/music/blackjack64.mp3");
let isPlaying = false;
let musica = document.getElementById("musica");
musica.addEventListener("click", play);
function play() {
    isPlaying ? song.pause() : song.play();
    isPlaying ? musica.innerHTML = "♫" : musica.innerHTML = "<del>♫</del>";
}
song.onplaying = function() {
    isPlaying = true;
}
song.onpause = function() {
    isPlaying = false;
}
song.addEventListener("ended", song.play);





btnReclamar.setAttribute("disabled", true);
volverAJugar();
range();
document.querySelector("#ventana-reglas").hidden = true;
document.querySelector("#ventana-recompensa").hidden = true;