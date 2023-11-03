import React from 'react';

function Felicitaciones({ nombreJugador, puntaje,jugador }) {
    return (
        <div>
            <h1>{nombreJugador}</h1>
            <p>Tu puntaje de {jugador}: {puntaje}</p>
        </div>
    );
}
export default Felicitaciones;