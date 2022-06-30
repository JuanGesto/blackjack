let puntosCasa = 0;
let puntosJugador = 0;
let back;
let mazo;
let acesJugador = 0;
let acesCasa = 0;
let balance = 1000;
let slider;
let max;
let apuesta;
let hoy;
let dia;
let ayer;
let rachaActual = 0;

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
    updateBalance();
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
    cartasCasa = document.getElementsByClassName("cartaC");
    blackjackJugador = false;
    blackjackCasa = false;
    if (puntosJugador === 21 & cartasJugador.length === 2) {
        blackjackJugador = true;
        addBlackjack();
    }
    if (puntosCasa === 21 & cartasCasa.length === 1) {
        blackjackCasa = true;
    }
    if (blackjackJugador === true & blackjackCasa != true) {
        cartelResultado.innerText = "¡Blackjack!";
        balance += parseInt(apuesta) * 2.5;
        balance = Math.ceil(balance);
        addVictoria();
        rachaMas();
    } else if (puntosJugador > 21 || (puntosCasa > puntosJugador & puntosCasa < 22) || (blackjackCasa === true & blackjackJugador != true)) {
        cartelResultado.innerText = "La casa gana";
        addDerrota();
        addRacha();
        racha0();
    } else if (puntosJugador == puntosCasa) {
        cartelResultado.innerText = "Es un empate";
        balance += parseInt(apuesta);
        addEmpate();
    } else {
        cartelResultado.innerText = "¡Usted gana!";
        balance += parseInt(apuesta) * 2;
        addVictoria();
        rachaMas();
    }
    updateBalance();
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

    addRecord();
}

/* -------------------------------------------------------------------------- */
/*                            Boton volver a jugar                            */
/* -------------------------------------------------------------------------- */

let btnVolverAJugar = document.getElementById("volverAJugar");
btnVolverAJugar.addEventListener("click", volverAJugar);

function volverAJugar() {
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
    updateBalance();
    localStorage.setItem("reclamar", 0)
    btnReclamar.setAttribute("disabled", true);
    max = document.getElementById("myRange");
    max.setAttribute("max", balance);
}

function recompensa() {
    fecha = new Date();
    dia = parseInt(fecha.getDay());
    hoy = localStorage.setItem("hoy", dia);
    if (isNaN(ayer)) {
        btnReclamar.setAttribute("disabled", true);
        localStorage.setItem("reclamar", 0);
    } else if (dia == ayer) {
        if (localStorage.getItem("reclamar") == 1) {
            btnReclamar.removeAttribute("disabled");
        } else {
            btnReclamar.setAttribute("disabled", true);
        }
    } else {
        btnReclamar.removeAttribute("disabled");
        localStorage.setItem("reclamar", 1);
    }
    if (loggedUserStats != undefined) {
        loggedUserStats["ayer"] = dia;
        updateStats();
    }
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
let svgSwap = document.getElementById("musica");

function play() {
    isPlaying ? song.pause() : song.play();
    isPlaying ? svgSwap.setAttribute("id", "musica") : svgSwap.setAttribute("id", "nomusica");
}
song.onplaying = function () {
    isPlaying = true;
}
song.onpause = function () {
    isPlaying = false;
}
song.addEventListener("ended", song.play);

/* -------------------------------------------------------------------------- */
/*                                   signUp                                   */
/* -------------------------------------------------------------------------- */
let NOAccounts = parseInt(localStorage.getItem("NOAccounts"));
if (isNaN(NOAccounts)) {
    NOAccounts = localStorage.setItem("NOAccounts", 0);
    NOAccounts = parseInt(localStorage.getItem("NOAccounts"));
}
let signUpSubmit = document.getElementById("signUpSubmit");
signUpSubmit.addEventListener("click", signUpCheck)
let signUpName;
let signUpPassword;

function signUpCheck() {
    let taken = false;
    signUpName = document.getElementById("signUpName").value;
    signUpPassword = document.getElementById("signUpPassword").value;

    for (let index = 0; index < NOAccounts; index++) {
        if (signUpName === (JSON.parse(localStorage.getItem("user"+index))[0].username)) {
            taken = true;
        }
    }
    if (signUpName.length < 4) {
        document.getElementById("invalid").innerHTML = "Su nombre de usuario debe tener al menos cuatro caracteres";
    } else if (signUpPassword.length < 4) {
        document.getElementById("invalid").innerHTML = "Su contraseña debe tener al menos cuatro caracteres";
    } else if (taken === true) {
        document.getElementById("invalid").innerHTML = "Este nombre de usuario ya fue tomado";
    } else {
        document.getElementById("invalid").innerHTML = "";
        signUp(NOAccounts);
    }
}
const newUser = [];
function signUp(userID) {

    newUser.push ({username: signUpName, password: signUpPassword});   //
    /*
    let user = {
        ID: userID,
        password: signUpPassword
    };
    localStorage.setItem(signUpName, JSON.stringify(user));
    */
    newAccount(userID);
    localStorage.setItem("NOAccounts", userID + 1);
    NOAccounts += 1;
    document.querySelector("#logIn").hidden = false;
    document.querySelector("#signUp").hidden = true;
}

let iniciar = document.getElementById("inicia");
iniciar.addEventListener("click", function () {
    document.querySelector("#logIn").hidden = false;
    document.querySelector("#signUp").hidden = true;
})

function newAccount(userID) {
    newUser.push({blackjacks: 0, racha: 0, victorias: 0, derrotas: 0, empates: 0, record: 0, balance: 1000, ayer})
    localStorage.setItem("user" + userID, JSON.stringify(newUser));
}

/* -------------------------------------------------------------------------- */
/*                                    logIn                                   */
/* -------------------------------------------------------------------------- */

let userData;
let loggedUser;
let loggedUserStats;
let registrarse = document.getElementById("registrate");
registrarse.addEventListener("click", function () {
    document.querySelector("#logIn").hidden = true;
    document.querySelector("#signUp").hidden = false;
})

let logInSubmit = document.getElementById("logInSubmit");
logInSubmit.addEventListener("click", logIn);

let logInName;
let logInPassword;

function logIn() {
    logInName = document.getElementById("logInName");
    logInPassword = document.getElementById("logInPassword");
    for (let i = 0; i < NOAccounts; i++) {
        userData = JSON.parse(localStorage.getItem("user"+i))
        let tempObject = userData[0];
        let tempUserName = tempObject.username;
        if (logInName.value === tempUserName) {
            let tempPassword = tempObject.password
            if (logInPassword.value === tempPassword) {
                loggedUser = "user"+i;
                document.getElementById("userName").innerHTML = logInName.value;
                loggedUserStats = userData[1]
                document.querySelector("#logIn").hidden = true;
                document.querySelector("#stats").hidden = false;

                document.getElementById("blackjacks").innerHTML = loggedUserStats["blackjacks"];
                document.getElementById("racha").innerHTML = loggedUserStats["racha"];
                document.getElementById("victorias").innerHTML = loggedUserStats["victorias"];
                document.getElementById("derrotas").innerHTML = loggedUserStats["derrotas"];
                document.getElementById("empates").innerHTML = loggedUserStats["empates"];
                document.getElementById("record").innerHTML = loggedUserStats["record"];
                document.getElementById("balance").innerHTML = loggedUserStats["balance"];
                balance = loggedUserStats["balance"];
                ayer = loggedUserStats["ayer"];

                let btnCheck = document.querySelector("#btnCheck");
                if (btnCheck.checked === true) {
                    localStorage.setItem("remember", "yes");
                    localStorage.setItem("sessionName", logInName.value);
                    localStorage.setItem("sessionPassword", logInPassword.value);
                } else {
                    localStorage.setItem("remember", "no");
                    localStorage.removeItem("sessionName");
                    localStorage.removeItem("sessionPassword");
                }
                document.getElementById("wrong").innerHTML = "";

                volverAJugar();
                range();
            } else {
                document.getElementById("wrong").innerHTML = "Contraseña incorrecta";
            } break
        } if (logInName.value != localStorage.key(i)) {
            document.getElementById("wrong").innerHTML = "Este usuario no existe";
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                    stats                                   */
/* -------------------------------------------------------------------------- */

function addBlackjack() {
    if (loggedUserStats != undefined) {
        loggedUserStats["blackjacks"] += 1;
        updateStats();
        document.getElementById("blackjacks").innerHTML = loggedUserStats["blackjacks"];
    }
}
function rachaMas() {
    if (loggedUserStats != undefined) {
        rachaActual += 1;
    }
    addRacha();
}
function racha0() {
    if (loggedUserStats != undefined) {
        rachaActual = 0;
    }
}
function addRacha() {
    if (loggedUserStats != undefined) {
        if (rachaActual > loggedUserStats["racha"]) {
            loggedUserStats["racha"] = rachaActual;
            updateStats();
            document.getElementById("racha").innerHTML = loggedUserStats["racha"];
        }
    }
}
function addVictoria() {
    if (loggedUserStats != undefined) {
        loggedUserStats["victorias"] += 1;
        updateStats();
        document.getElementById("victorias").innerHTML = loggedUserStats["victorias"];
    }
}
function addDerrota() {
    if (loggedUserStats != undefined) {
        loggedUserStats["derrotas"] += 1;
        updateStats();
        document.getElementById("derrotas").innerHTML = loggedUserStats["derrotas"];
    }
}
function addEmpate() {
    if (loggedUserStats != undefined) {
        loggedUserStats["empates"] += 1;
        updateStats();
        document.getElementById("empates").innerHTML = loggedUserStats["empates"];
    }
}
function addRecord() {
    if (loggedUserStats != undefined) {
        if (balance > loggedUserStats["record"]) {
            loggedUserStats["record"] = balance;
            updateStats();
            document.getElementById("record").innerHTML = loggedUserStats["record"];
        }
    }
}
function updateBalance() {
    if (loggedUserStats != undefined) {
        loggedUserStats["balance"] = balance;
        updateStats();
    } else {

    }
    document.getElementById("balance").innerText = balance;
}
function updateStats() {
    userData.pop();
    userData.push(loggedUserStats);
    localStorage.setItem(loggedUser, JSON.stringify(userData));
}

/* -------------------------------------------------------------------------- */
/*                                  sidepanel                                 */
/* -------------------------------------------------------------------------- */

let btnUser = document.getElementById("user");
btnUser.addEventListener("click", abrirPanel);

function abrirPanel() {
    document.querySelector("#sidepanel").hidden = false;
}
let btnCerrarPanel = document.getElementById("cerrarPanel")
btnCerrarPanel.addEventListener("click", cerrarPanel)

function cerrarPanel() {
    document.querySelector("#sidepanel").hidden = true;
}

let btnLogOf = document.getElementById("logOf");
btnLogOf.addEventListener("click", logOf);

function logOf() {
    loggedUserStats = undefined;
    localStorage.setItem("remember", "no");
    localStorage.removeItem("sessionName");
    localStorage.removeItem("sessionPassword");
    document.querySelector("#stats").hidden = true;
    document.querySelector("#logIn").hidden = false;
}

/* -------------------------------------------------------------------------- */
/*                                   onload                                   */
/* -------------------------------------------------------------------------- */

logInName = document.getElementById("logInName");
logInPassword = document.getElementById("logInPassword");
let sessionName = localStorage.getItem("sessionName");
let sessionPassword = localStorage.getItem("sessionPassword");
let remember = localStorage.getItem("remember");

function autoLogIn() {
    if (remember === "yes") {
        logInName.setAttribute("value", sessionName);
        logInPassword.setAttribute("value", sessionPassword);
        logIn();
    }
}

btnReclamar.setAttribute("disabled", true);
volverAJugar();
range();
document.querySelector("#ventana-reglas").hidden = true;
document.querySelector("#ventana-recompensa").hidden = true;
document.querySelector("#sidepanel").hidden = true;
document.querySelector("#logIn").hidden = false;
document.querySelector("#signUp").hidden = true;
document.querySelector("#stats").hidden = true;
autoLogIn();