import React, {useState} from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio(){
    const [nombreJugador, setNombreJugador] = useState('');//Va a guardar el nombre del chico
    const [nombreJugador2, setNombreJugador2] = useState('');
    const [puntaje2,setPuntaje2] = useState(0)
    const [puntaje, setPuntaje] = useState (0);
    
    const [mostrarJuego,setMostrarJuego] = useState(false);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState (false);//Para saber si ya termino o no el juego
    const [rondaActual, setRondaActual] = useState (1);//Va a empezar el 1 y va a ser ronda aleatoria entre 5-10

    const manejarClickJugar = (nombre) => {
        if (nombreJugador === "" || nombreJugador2 === "") {//Si uno de los 2 jugadores no ingresaron su nombre que salte una alerta de que falta completar los campos
         setMostrarJuego(false);
        }else{
        setNombreJugador(nombre);
        setNombreJugador2(nombre);
        setMostrarJuego(true);
        setPuntaje(0);
        setPuntaje2(0);
        setMostrarFelicitaciones(false);
        }
    }

    const alTerminar = (puntaje) => {
        setPuntaje(puntaje);
        setPuntaje2(puntaje)
        setMostrarJuego(false);
        setMostrarFelicitaciones(true);
    }

    /*Cuando el usuario ingresa por primera vez*/
    if (!mostrarJuego && !mostrarFelicitaciones){//mostrarJuego = true, mostrarFelicitaciones = true
        return(
            <div>
                <h1>Jugador 1</h1>
                <input 
                type='text'
                placeholder="Nombre"
                onChange={(e) => setNombreJugador(e.target.value)}//Esta escuchando el input y cada que cambia lo guarda en la linea 6
                ></input>
                {/* Llama a la funcion manejarClickJugar al hacer click con el nombre del chico con su nombre que se cargo en onChange */}
                <button onClick={() => manejarClickJugar(nombreJugador)}>Jugar</button>
                <div>

                <h1>Jugador 2</h1>
                <input 
                type='text'
                placeholder="Nombre"
                onChange={(e) => setNombreJugador2(e.target.value)}//Esta escuchando el input y cada que cambia lo guarda en la linea 6
                ></input>
                {/* Llama a la funcion manejarClickJugar al hacer click con el nombre del chico con su nombre que se cargo en onChange */}
                <button onClick={() => manejarClickJugar(nombreJugador2)}>Jugar</button>
            </div>
            </div>
            
        );
        /*Cuando el usuario ingresa por X cantidad veces*/
    }else if (mostrarJuego) {
        return(
            <div>
                <Juego
                nombreJugador = {nombreJugador}
                puntaje = {puntaje}
                setPuntaje = {setPuntaje}
                alTerminar = {alTerminar}
                rondaActual = {rondaActual}
                setRondaActual = {setRondaActual}
                />
            </div>
        );
    }else if (mostrarFelicitaciones) {
        return(
            <div>
                <Felicitaciones nombreJugador = {nombreJugador} puntaje = {puntaje}/>
            </div>
        );
    }
}
export default Inicio;