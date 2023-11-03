import React, { useState } from 'react';
//Importamos los componente necesarios
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [nombreJugador1, setNombreJugador1] = useState('');//Nombre del jugador 1
    const [nombreJugador2, setNombreJugador2] = useState('');//Nombre del jugador 2
    const [puntaje1, setPuntaje1] = useState(0);//Puntaje del jugador 1
    const [puntaje2, setPuntaje2] = useState(0);//Puntaje del jugador 2
    const [mostrarJuego, setMostrarJuego] = useState(false);//Estado que decide si se debe mostrar la pantalla del juego
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);//Estado que mostrara la pantalla final al terminar las rondas
    const [rondaActual, setRondaActual] = useState(1);//Estado que guardara el estado de la ronda actual

    /*Se va a llamar a esta funcion cada vez que los jugadores presionen sobre el boton y va a hacer las verificaciones de los nombres*/
    const manejarClickJugar = (nombre) => {
        /*Alerta que si un jugador o ambos no pusieron sus nombres*/
        if (nombreJugador1 === "" && nombreJugador2 === "") {
            window.alert("Por favor ingresen sus nombres");
        } else {
            if (nombreJugador1 === "") {
                window.alert("Por favor jugador 1, ingrese su nombre")
                setNombreJugador1(nombre);
            } else if (nombreJugador2 === "") {
                window.alert("Por favor jugador 2, ingrese su nombre")
                setNombreJugador2(nombre);
                //setMostrarJuego(true);
            }
        }
        /*Verifica que los jugadores pongan sus nombres, si es verdadero mostrara el juego*/
        if (nombreJugador1 !== "" && nombreJugador2 !== "") {
            setMostrarJuego(true);
        }
    };
    /*Se lo va a llamar una vez que el jugador X termine su turno*/
    const alTerminarJugador1 = (puntaje) => {//Recibe el argumento 'puntaje' que sera la puntacion obtenida del jugador 1
        setPuntaje1(puntaje);//Actualiza la puntuacion del jugador 1 con el valor de 'puntaje' osea el puntaje obtenido al terminar su turno
        if (nombreJugador2 === "") {          
            setMostrarJuego(false);
            setMostrarFelicitaciones(false);
        } else {//Si el jugador ingreso su nombre resetea la puntuacion a 0 para la otra ronda         
            setPuntaje2(0);
            setMostrarFelicitaciones(true);
            setMostrarJuego(false);
        }
    }

    const alTerminarJugador2 = (puntaje) => {//Cuando jugador 2 termine su turno, este tendra un argumento que va a ser la puntuacion pero del jugador 2
        setPuntaje2(puntaje);
        setMostrarFelicitaciones(true);
        setMostrarJuego(false);
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div>
                <h1>Ingresa tu nombre jugador 1</h1>
                <input
                    type="text"
                    onChange={(e) => setNombreJugador1(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador1)}>Jugar</button>

                <h1>Ingresa tu nombre jugador 2</h1>
                <input
                    type="text"
                    onChange={(e) => setNombreJugador2(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador2)}>Jugar</button>
            </div>
        );
    } else if (mostrarJuego) {
        return (
            <div>
                <Juego
                /*PROPS*/
                    nombreJugador1={nombreJugador1}
                    nombreJugador2={nombreJugador2}
                    puntaje1={puntaje1}
                    setPuntaje1={setPuntaje1}
                    puntaje2={puntaje2}
                    setPuntaje2={setPuntaje2}
                    alTerminarJugador1={alTerminarJugador1}
                    alTerminarJugador2={alTerminarJugador2}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}
                />
            </div>
        );
    } else if (mostrarFelicitaciones) {
        return (
            <div>
                <Felicitaciones nombreJugador={nombreJugador1} puntaje={puntaje1} />
                <Felicitaciones nombreJugador={nombreJugador2} puntaje={puntaje2} />
            </div>
        );
    }
}

export default Inicio;