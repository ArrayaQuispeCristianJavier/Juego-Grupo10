import React,{ useState, useEffect } from "react";

function Juego({ nombreJugador,nombreJugador2, puntaje, setPuntaje,puntaje2,setPuntaje2, alTerminar, rondaActual, setRondaActual }){
const [animalObjetivo, setAnimalObjetivo] = useState('');//Gurdar el nombre de la imagen que sale de forma aleatoria
const [opciones, setOpciones] = useState([]);//
const [esCorrecto, setEsCorrecto] = useState(null);//Para saber si el chico hizo click en el nombre correcto o no
const [rondaTotales, setRondasTotales] = useState(Math.floor(Math.random()*6)+5);//Genera numero aleatorio entre 5 - 10
const [puedeHacerClic, setPuedeHacerClic] = useState(true);//Una vez que el chico hace click en un boton este de desactivara osea pasaria a false

const obtenerAnimalesAleatorio = () => {
    const animales = ['gato', 'perro', 'vaca', 'leon', 'cebra','jirafa'];
    const indiceAleatorio = Math.floor(Math.random() * animales.length);
    return animales[indiceAleatorio];//Va a devolver lo que tenga el arreglo de animales con la posicion aleatoria que dio indiceAleatorio
};
//setEsCorrecto
const obtenerOpcionesAleatoria = () =>{
    const animalCorrecto = obtenerAnimalesAleatorio();//Lo que salga de la funcion obtenerAnimalCorrecto de 'return animales[indiceAleatorio]' lo guarda en animalCorrecto 
    let opcionesAleatoria = [animalCorrecto];

    /*Generar los valores para los otros botones*/
    while (opcionesAleatoria.length < 3) {
        const opcion = obtenerAnimalesAleatorio();//Vuelve a llamar a la funcion obtenerAnimalesAleatorio para tener otros resultado
    
        if (!opcionesAleatoria.includes(opcion)) {//opcionesAleatoria incluye en el arreglo opcion?, "!" sino esta incluida lo agrego, esto se usa para evitar que salga botones con el mismo animal
        opcionesAleatoria.push(opcion);//Si no esta, lo agrego
        }
    }
    opcionesAleatoria = opcionesAleatoria.sort(() => Math.random() - 0.5);//Los botones van a salir desordenados
    setOpciones(opcionesAleatoria);
    setAnimalObjetivo(animalCorrecto);
};
const verificarRespuesta = (animalSeleccionado) => {
    if (animalSeleccionado === animalObjetivo) {
        setEsCorrecto(true);
        setPuntaje(puntaje + 1);
    }else{
        setEsCorrecto(false);
    }
    setPuedeHacerClic(false);
}
const siguienteRonda = () =>{
    //Aniadir una logica para que jugador1 respondio no avanze de ronda hasta que jugador 2 responda bien o mal
    if (rondaActual < rondaTotales) {
       setRondaActual(rondaActual + 1);
       setEsCorrecto(null);
       setPuedeHacerClic(true);
       obtenerAnimalesAleatorio(); 
    }else{
        alTerminar(puntaje);
    }
};
const opcionesDeshabilitada = esCorrecto !== null;

/*El useEffect sirve para obtenes la funcion de obtenerOpcionesAleatoria */
useEffect(()=>{
    obtenerOpcionesAleatoria();
}, []);

return(
    <div>
        {/* Jugador 1 */}
        <h1>{nombreJugador}, Cual es este animal?</h1>
        <p>Ronda actual {rondaActual}</p>
        <img src={`img/${animalObjetivo}.jpg`}/>
        <div>
            {opciones.map((animal)=>(
            <button
            key={animal}
            onClick={()=> verificarRespuesta(animal)}
            disabled={!puedeHacerClic || opcionesDeshabilitada}
            >
            {animal}
            </button>
            ))}
        </div>
        {esCorrecto === true && <p>Correcto!</p>}
        {esCorrecto === false && <p>Incorrecto!</p>}
        <button onClick={siguienteRonda}>Siguiente</button>
         {/* Jugador 2 */}
        <h1>{nombreJugador2}, Cual es este animal?</h1>
        <p>Ronda actual {rondaActual}</p>
        <img src={`img/${animalObjetivo}.jpg`}/>
        <div>
            {opciones.map((animal)=>(
            <button
            key={animal}
            onClick={()=> verificarRespuesta(animal)}
            disabled={!puedeHacerClic || opcionesDeshabilitada}
            >
            {animal}
            </button>
            ))}
        </div>
        {esCorrecto === true && <p>Correcto!</p>}
        {esCorrecto === false && <p>Incorrecto!</p>}
        <button onClick={siguienteRonda}>Siguiente</button>
    </div>
)
}
export default Juego;