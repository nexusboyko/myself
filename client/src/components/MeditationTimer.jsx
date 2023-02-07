import React, { useEffect, useState } from "react";
import sound from "../bells.mp3";

const MeditationTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if(timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const audio = new Audio(sound);
  audio.volume = 0.2;

  const updateTimer = (time) => {
    let inSeconds = 0;
    switch (time) {
      case 1:
        inSeconds = 60;
        break;
      case 3:
        inSeconds = 180;
        break;
      case 5:
        inSeconds = 300;
        break;
    
      default:
        break;
    }
    setTimer(inSeconds);
  }

  return(
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white"><strong><span>{Math.floor(timer / 60)}</span>:<span>{timer % 60 < 10 ? `0${timer % 60}` : `${timer % 60}`}</span></strong></h1>
        <div className="d-flex p-5">
          <button className="border btn btn-lg text-white mx-1" onClick={() => {
            updateTimer(1);
            audio.play();
          }}>1</button>
          <button className="border btn btn-lg text-white mx-1" onClick={() => {
            updateTimer(3);
            audio.play();
          }}>3</button>
          <button className="border btn btn-lg text-white mx-1" onClick={() => {
            updateTimer(5);
            audio.play();
          }}>5</button>
        </div>
      </div>
    </>
  );

};

export default MeditationTimer;
