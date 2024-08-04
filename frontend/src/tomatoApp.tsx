import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function TomatoApp() {
  const WORK_TIME = 25;
  const BREAK_TIME = 25;
  const [timeLeft, setTimeLeft] = useState(WORK_TIME*60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(WORK_TIME*60);
    }
  }, [timeLeft]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    setTimeLeft(BREAK_TIME*60);
  }

  function tick() {
    if (isRunning) setTimeLeft(timeLeft => timeLeft - 1);
    if (timeLeft === 0) setIsRunning(false);
  }
  
  

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-200 h-200">
      <CircularProgressbar 
          styles = {buildStyles({strokeLinecap: 'butt'})}
          value={timeLeft} 
          maxValue={WORK_TIME * 60} 
          text={`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`} 
        />
      </div> 
      <button onClick={handleStartPause} className="btn btn-ghost m-4">{isRunning ? 'STOP' : 'START'}</button>
    </div>
  );
}

export default TomatoApp;
