
function jugar() {

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
    newGame = prompt("¿Quiere volver a jugar?")
}