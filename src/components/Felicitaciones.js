import React from 'react';

function Felicitaciones({ nombreJugador, puntaje }){
    return(
        <div>
            <h1>Felicitaciones, {nombreJugador}</h1>
            <p>Tu puntaje total es: {puntaje}</p>
        </div>
    );
}
export default Felicitaciones;