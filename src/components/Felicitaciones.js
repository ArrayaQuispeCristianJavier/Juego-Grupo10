import React from 'react';

function Felicitaciones({ nombreJugador, puntaje,nombreJugador2,puntaje2 }){
    return(
        <div>
            {/* Puntaje del jugador 1 */}
            <h1>{nombreJugador}</h1>
            <p>Tu puntaje total es: {puntaje}</p><br></br>

            {/* Puntaje del jugador 2 */}
            <h1>{nombreJugador2}</h1>
            <p>Tu puntaje total es: {puntaje2}</p>
        </div>
    );
}
export default Felicitaciones;