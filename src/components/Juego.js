import React, { useState, useEffect } from 'react';

function Juego({ nombreJugador,nombreJugador2, puntaje, setPuntaje,puntaje2,setPuntaje2, alTerminar, rondaActual,setRondaActual }) {
    const [animalObjetivo, setAnimalObjetivo] = useState('');
    const [animalObjetivo2, setAnimalObjetivo2] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [opciones2,setOpciones2] = useState([]);
    
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);

    const [respuestaJugador1, setRespuestaJugador1] = useState(null);
    const [respuestaJugador2, setRespuestaJugador2] = useState(null);

   
    /*Jugador 1*/
    const obtenerAnimalAleatorio = () => {
        const animales = ['gato', 'perro', 'vaca', 'leon', 'jirafa', 'cebra'];//Jugador1
        const indiceAleatorio = Math.floor(Math.random() * animales.length);//Jugador1
        return animales[indiceAleatorio];//jugador1       
    };
    
    /*Jugador 2*/
    const obtenerAnimalAleatorio2 =()=>{
    const animales2 = ['gato', 'perro', 'vaca', 'leon', 'jirafa', 'cebra'];//Jugador2 
    const indiceAleatorio2 = Math.floor(Math.random()*animales2.length)//Jugador2
    return animales2[indiceAleatorio2]//jugador2
    }
    /*Jugador1*/
    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };

    /*Jugador 2*/
    const obtenerOpcionesAleatorias2 = () => {
        const animalCorrecto2 = obtenerAnimalAleatorio2();
        let opcionesAleatorias = [animalCorrecto2];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio2();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones2(opcionesAleatorias);
        setAnimalObjetivo2(animalCorrecto2);
    }

    /*Jugador 1*/
    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo) {
            setEsCorrecto(true);
            setPuntaje(puntaje + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };
    /*Jugador 2*/
    const verificarRespuesta2 = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo2) {
            setEsCorrecto(true);
            setPuntaje2(puntaje2 + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };

    const siguienteRonda = () => {
        if(rondaActual < rondasTotales){
        if (respuestaJugador1!==null && respuestaJugador2!==null) {
            setRondaActual(rondaActual + 1);
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            setRespuestaJugador1(null);
            setRespuestaJugador2(null);
            setPuedeHacerClic(true)
            obtenerAnimalAleatorio2();
            obtenerOpcionesAleatorias2();       
        } else {
            alTerminar(puntaje);
            alTerminar(puntaje2);
        }
    }
    };


    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
        obtenerAnimalAleatorio();
        obtenerOpcionesAleatorias();
        obtenerAnimalAleatorio2();
        obtenerOpcionesAleatorias2();
    }, []);

    return (
        
            <div>
                <h1>{nombreJugador}, ¿Cuál es este animal?</h1>
                <p>Ronda actual: {rondaActual}</p>
                <img src={`img/${animalObjetivo}.jpg`} alt={animalObjetivo} />
                <div>
                    {opciones.map((animal) => (
                        <button
                            key={animal}
                            onClick={() => verificarRespuesta(animal)}
                            disabled={!puedeHacerClic || opcionesDeshabilitadas}
                        >
                            {animal}
                        </button>
                    ))}
                </div>
                {respuestaJugador1 === true && <p>¡Correcto!</p>}
                {respuestaJugador1 === false && <p>¡Incorrecto!</p>}
                 <button onClick={siguienteRonda}>Siguiente ronda</button>


                <h1>{nombreJugador2}, ¿Cuál es este animal?</h1>
                <img src={`img/${animalObjetivo2}.jpg`} alt={animalObjetivo2} />
                <div>
                    {opciones2.map((animal) => (
                        <button
                            key={animal}
                            onClick={() => verificarRespuesta2(animal)}
                            disabled={!puedeHacerClic || opcionesDeshabilitadas}
                        >
                            {animal}
                        </button>
                    ))}
                </div>
                {respuestaJugador2 === true && <p>¡Correcto!</p>}
                {respuestaJugador2 === false && <p>¡Incorrecto!</p>}
                <button onClick={siguienteRonda}>Siguiente</button>
            </div>
        );
    }
export default Juego;