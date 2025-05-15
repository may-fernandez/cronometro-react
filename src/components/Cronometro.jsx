import React, { useState, useEffect, useRef } from "react";
import './Cronometro.css';
import '../assets/fondo-cronometro.svg'

function Cronometro() {
  const [isCorriendo, setIsCorriendo] = useState(false);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const intervalIdRef = useRef(null);
  const empezarTiempoRef = useRef(0);

  useEffect(() => {

    if(isCorriendo){
        intervalIdRef.current = setInterval(() => {
            setTiempoTranscurrido(Date.now() - empezarTiempoRef.current);
        } , 10);
    }

    return () => {
        clearInterval(intervalIdRef.current);
    }

  }, [isCorriendo]);

  function empezar() {

    setIsCorriendo(true);
    empezarTiempoRef.current = Date.now() - tiempoTranscurrido;
  }

  function parar() {
    setIsCorriendo(false);
  }

  function reiniciar() {
    setTiempoTranscurrido(0);
    setIsCorriendo(false);
  }

  function formatearTiempo() {
    
    // Para transformar Date.now() eb horas, minutos, segundos y milisegundos
    let horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
    let minutos = Math.floor(tiempoTranscurrido / (1000 * 60) % 60);
    let segundos = Math.floor(tiempoTranscurrido / (1000) % 60);
    let milisegundos = Math.floor((tiempoTranscurrido % 1000) / 10);

    // Para que aparezca con 2 0s al principio
    horas = String(horas).padStart(2, "0");
    minutos = String(minutos).padStart(2,"0");
    segundos = String(segundos).padStart(2, "0");
    milisegundos = String(milisegundos).padStart(2, "0"); 

    return `${minutos}:${segundos}:${milisegundos}`;
  }

  return (
  <div className="cronometro">
    <div className="display">{formatearTiempo()}</div>
    <div className="controles">
        <button onClick={empezar} className="btn-empezar">Empezar</button>
        <button onClick={parar} className="btn-parar">Parar</button>
        <button onClick={reiniciar} className="btn-reiniciar">Reiniciar</button>   
    </div>
  </div>);
}

export default Cronometro;