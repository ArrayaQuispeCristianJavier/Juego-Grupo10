import React, { useState, useEffect } from 'react';
import animal from './../data/animal.json';

/*Componente juego que tiene los props*/
function Juego({ nombreJugador1, nombreJugador2, puntaje2,puntaje1,setPuntaje1,setPuntaje2, alTerminarJugador2,  rondaActual, setRondaActual }) {
  const [animalObjetivo, setAnimalObjetivo] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [esCorrecto, setEsCorrecto] = useState(null);
  const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
  const [puedeHacerClic, setPuedeHacerClic] = useState(true);

  
  const [turnoJugador2, setTurnoJugador2] = useState(false)

  /*Va a obtener un animal de forma aleatoria del arreglo 'animales' y devuelve el animal seleccionado*/
  const obtenerAnimalAleatorio = () => {
    const animales = animal;
    const indiceAleatorio = Math.floor(Math.random() * animales.length);
    return animales[indiceAleatorio];
  };

  /*Se va a encargar de tener 3 opciones de animales*/
  const obtenerOpcionesAleatorias = () => {
    const animalCorrecto = obtenerAnimalAleatorio();//Va a llamar a la funcion 'obtenerAnimalesAleatorio()' para tener un animal
    let opcionesAleatorias = [animalCorrecto];//opcionesAleatoria es un arreglo que tiene animalCorrecto osea dice que el animal que toque siempre salga en las opciones

    while (opcionesAleatorias.length < 3) {
      const opcion = obtenerAnimalAleatorio();
      if (!opcionesAleatorias.includes(opcion)) {
        opcionesAleatorias.push(opcion);
      }
    }

    opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

    setOpciones(opcionesAleatorias);
    setAnimalObjetivo(animalCorrecto.nombre);
  };

  const verificarRespuesta = (animalSeleccionado) => {
    if (animalSeleccionado === animalObjetivo) {//Verifica si la opcion que eligio el usuario es igual a la opcion que le dio de forma aleatoria 
      if (!turnoJugador2) {//Si no es el turno de jugador 2 entonces se le aumenta el puntaje al jugador 1
        setPuntaje1(puntaje1 + 1);
      } else {//En caso que SI sea turno del jugador 2 entonces este le aumenta su puntaje a el (jugador 2)
        setPuntaje2(puntaje2 + 1);
      }
      setEsCorrecto(true);
    } else {
      setEsCorrecto(false);
    }
    setPuedeHacerClic(false);
  };

  const siguienteRonda = () => {
    if (rondaActual < rondasTotales) {
      setRondaActual(rondaActual + 1);
      setEsCorrecto(null);
      setPuedeHacerClic(true);
      obtenerOpcionesAleatorias();
      /*Explicacion con detalles: Va a cambiar de ronda una vez que se haya completado la mitad de la ronda */
      //Si la ronda actual es igual o mayor a ronda totales dara el aviso que esta a la mitad y cambiara de jugador
      //Por ejemplo si son 10 rondas este dividira en 2 y daria como resultado 5 y que en la ronda 5, seguira el otro jugador
      setTurnoJugador2(rondaActual >= rondasTotales / 2);
    } else {
      if (turnoJugador2) {
        alTerminarJugador2(puntaje2);
      } else {
        setTurnoJugador2(true);
      }
    }
  }
    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
      obtenerOpcionesAleatorias();
    }, []);

    return (
      <div>
        {/* Si el turno de jugador es falso, mostrara al jugador 1 o sino pasa lo contrario */}
        <h1>{!turnoJugador2 ? nombreJugador1 : nombreJugador2}, ¿Cuál es este animal?</h1>
        <p>Ronda actual: {rondaActual}</p>
        <img src={`img/${animalObjetivo}.jpg`} alt={animalObjetivo} />
        <div>
          {opciones.map((animal) => (
            <button
              key={animal.nombre}
              onClick={() => verificarRespuesta(animal.nombre)}
              disabled={!puedeHacerClic || opcionesDeshabilitadas}
            >
              {animal.nombre}
            </button>
          ))}
        </div>
        {esCorrecto === true && <p>¡Correcto!</p>}
        {esCorrecto === false && <p>¡Incorrecto!</p>}
        <button onClick={siguienteRonda}>Siguiente</button>
      </div>
    );
  };

  export default Juego;