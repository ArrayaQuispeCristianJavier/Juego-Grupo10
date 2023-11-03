import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [nombreJugador1, setNombreJugador1] = useState('');
    const [nombreJugador2, setNombreJugador2] = useState('');
    const [puntaje1, setPuntaje1] = useState(0);
    const [puntaje2, setPuntaje2] = useState(0);
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);

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
        /*Verifica que los jugadores pongan sus nombres*/
        if (nombreJugador1 !== "" && nombreJugador2 !== "") {
            setMostrarJuego(true);
        }
    };

    const alTerminarJugador1 = (puntaje) => {
        setPuntaje1(puntaje);
        if (nombreJugador2 === "") {
            
            setMostrarJuego(false);
            setMostrarFelicitaciones(false);
        } else {
            
            setPuntaje2(0);
            setMostrarFelicitaciones(false);
        }
    }

    const alTerminarJugador2 = (puntaje) => {
        setPuntaje2(puntaje);
        setMostrarFelicitaciones(true);
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