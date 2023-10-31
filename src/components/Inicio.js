import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [nombreJugador, setNombreJugador] = useState('');
    const [nombreJugador2, setNombreJugador2] = useState('');
    const [puntaje, setPuntaje] = useState(0);
    const [puntaje2, setPuntaje2] = useState(0);
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);

    const manejarClickJugar = (nombre) => {
        if (nombreJugador === "" && nombreJugador2 ==="") {
        setMostrarJuego(false);
        }else{
        setNombreJugador(nombre);
        setNombreJugador2(nombre);
        setMostrarJuego(true);
        setPuntaje(0);
        setMostrarFelicitaciones(false);
        }
    };

    const alTerminar = (puntaje) => {
        setPuntaje(puntaje);
        setPuntaje2(puntaje)
        setMostrarJuego(false);
        setMostrarFelicitaciones(true);
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            
            <div>
                {/* Jugador 1 */}
                <h1>Ingresa tu nombre jugador 1</h1>
                <input
                    type="text"
                    placeholder="Nombre del niño"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador)}>Jugar</button>
            
            {/* Jugador 2 */}
            <h1>Ingresa tu nombre jugador 2</h1>
                <input
                    type="text"
                    placeholder="Nombre del niño"
                    onChange={(e) => setNombreJugador2(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador2)}>Jugar</button>
            
            </div>
        );
    } else if (mostrarJuego) {
        return (
            <div>
                <Juego
                    nombreJugador={nombreJugador}
                    nombreJugador2 ={nombreJugador2}

                    puntaje={puntaje}
                    setPuntaje={setPuntaje}
                    puntaje2 ={puntaje2}
                    setPuntaje2={setPuntaje2}
                   
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}

                />
            </div>
        );
    } else if (mostrarFelicitaciones) {
        return (
            <div>
                <Felicitaciones nombreJugador={nombreJugador} puntaje={puntaje} />
                <Felicitaciones nombreJugador2={nombreJugador2} puntaje2={puntaje2} />
            </div>
        );
    }
}

export default Inicio;