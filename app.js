//QuerySelector: Acceder al html por medio de un selector
//InnerHTML:  Permite insertar o extraer contenido HTML
//GetElementById:  permite acceder a un elemento del DOM por su id.
//Value: Obtiene el valor que se encuentra en los input, select y textarea
//CreateElement: Crea un nuevo elemento HTML
//typeof(): Devuelve el tipo de dato de una variable (string, number, boolean...)

//FUNCIONES
function verificarIntento() {
    ++intentos;
    if(intentos==numeroIntentos){
        asignarTextoElemento("p","Fallaste!\nSe han acabado el número de intentos");
        document.getElementById("verificar").setAttribute("disabled", "true");
        document.getElementById("reiniciar").removeAttribute("disabled" );
    }else{
        let numeroDeUsuario = parseInt(document.getElementById('entradaNumeroUsuario').value);
        if(numeroDeUsuario===numeroSecret){
            asignarTextoElemento("p", `¡Acertaste!\nTe tomó ${intentos} ${intentos<1 ? "intentos" : "intento"}`);
        //*Quitarle atributos a un boton el de "disable"
            document.getElementById("reiniciar").removeAttribute("disabled" );
            document.getElementById("verificar").setAttribute("disabled", "true");
        }else{
            if(numeroDeUsuario<numeroSecret){
                asignarTextoElemento("p","Fallaste!\nEl número secreto es mayor");
            }else{
                asignarTextoElemento("p","Fallaste!\nEl número secreto es menor");
            }
        }
        limpiarInput();
    }
};

function asignarTextoElemento(elemento, texto){
    let elementoHtml = document.querySelector(elemento);  //Objeto 
    elementoHtml.innerText = texto; //Asigna un contenido al selector
};

function generarNumeroSecreto(){
    let numero = Math.floor(Math.random() * (numeroRangoMaximo))+1;
    if(!numerosSecretos.includes(numero)){
        console.log(numero);
        numerosSecretos.push(numero);
        return numero;
    }else{
        if(numerosSecretos.length == numeroRangoMaximo){
            numerosSecretos=[];
        //? SI SE QUIERE BLOQUEAR EL JUEGO AL PASAR TODOS LOS NUMEROS
            // asignarTextoElemento('p', 'Ya han salido todos los numeros disponibles');
            // document.querySelector('#entradaNumeroUsuario').setAttribute('disabled', 'true');
            // document.querySelector('#reiniciar').setAttribute('disabled', 'true');
            // document.querySelector('#verificar').setAttribute('disabled', 'true');
        }else{
            return generarNumeroSecreto();
        }
    }
}

function limpiarInput(){
    document.getElementById('entradaNumeroUsuario').value='';
    //*Alternativa
    //document.querySelector("#entradaNumeroUsuario").value="";
}

function reiniciarJuego(){
    limpiarInput();
    inicializarJuego();
}

function inicializarJuego() {
    asignarTextoElemento('p', "Indica un número del 1 al 10");
    document.querySelector("#reiniciar").setAttribute("disabled", "true");
    document.getElementById("verificar").removeAttribute("disabled");
    numeroSecret=generarNumeroSecreto();
    intentos=0;
}




//VARIABLES
const numeroIntentos = 5; 
let intentos=0;
let numeroRangoMaximo =10;
let numeroSecret;
let numerosSecretos=[];
//LLAMADA A FUNCIONES
asignarTextoElemento('h1', "Juego del número secreto");
inicializarJuego();

