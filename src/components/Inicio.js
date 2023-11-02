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
        if (nombreJugador1 === "" || nombreJugador2 === "") {
        setMostrarJuego(false); 
        window.alert("Por favor ingresen sus nombres");
        if(nombreJugador1 ===""){
        window.alert("Jugador 1 no registro su nombre")
        }else if (nombreJugador2 ==="") {
        window.alert("Jugador 2 no registro su nombre");
        }

        }else{
        setNombreJugador1(nombre);
        setNombreJugador2(nombre);
        setMostrarJuego(true);
        setPuntaje1(0);
        setMostrarFelicitaciones(false);
        }
    };

    const alTerminarJugador1 = (puntaje) => {
        setPuntaje1(puntaje1 + 1);
        setMostrarJuego(false);
        setMostrarFelicitaciones(false);
    }
    const alTerminarJugador2 = (puntaje) =>{
        setPuntaje2(puntaje2 + 1);
        setMostrarJuego(false);
        setMostrarFelicitaciones(false)
    }
    

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            
            <div>
                {/* Jugador 1 */}
                <h1>Ingresa tu nombre jugador 1</h1>
                <input
                    type="text"
                    // placeholder="Nombre del niño"
                    onChange={(e) => setNombreJugador1(e.target.value)}
                />
                <button onClick={() =>manejarClickJugar(nombreJugador1)}>Jugar</button>
            
            {/* Jugador 2 */}
            <h1>Ingresa tu nombre jugador 2</h1>
                <input
                    type="text"
                    // placeholder="Nombre del niño"
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
                <Felicitaciones nombreJugador1={nombreJugador1} puntaje={puntaje1} />
                <Felicitaciones nombreJugador2={nombreJugador2} puntaje2={puntaje2} />
            </div>
        );
    }
}

export default Inicio;