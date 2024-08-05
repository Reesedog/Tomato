import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function TomatoApp() {
  const WORK_TIME = 25;
  const BREAK_TIME = 5;
  enum EnumStatus {
    Working,
    Breaking,
    Stopped,
  }
  const [timeLeft, setTimeLeft] = useState(WORK_TIME * 60);
  const [status, setStatus] = useState(EnumStatus.Stopped);
  const [timerColor, setTimerColor] = useState(`#3b9ed4`);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((status === EnumStatus.Working) || (status === EnumStatus.Breaking)) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status, EnumStatus.Working, EnumStatus.Breaking]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (status === EnumStatus.Working) {
        setTimeLeft(BREAK_TIME * 60);
        setStatus(EnumStatus.Breaking);
        setTimerColor(`#68cc8b`);
      }
      if (status === EnumStatus.Breaking) {
        setTimeLeft(WORK_TIME * 60);
        setStatus(EnumStatus.Working);
        setTimerColor(`#3b9ed4`);
      }
    }
  }, [timeLeft, status, EnumStatus.Working, EnumStatus.Breaking]);

  const handleStartPause = () => {
    if (status === EnumStatus.Stopped) {
      setStatus(EnumStatus.Working);
      setTimeLeft(WORK_TIME * 60);
    } else {
      setStatus(EnumStatus.Stopped);
      setTimerColor(`#3b9ed4`);
      setTimeLeft(WORK_TIME * 60);
    }

  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-200 h-200">
        <CircularProgressbar
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathColor: timerColor,
            textColor: timerColor,
            trailColor: `white`,

          })}
          value={timeLeft}
          maxValue={WORK_TIME * 60}
          text={`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`}
        />
      </div>
      <button onClick={handleStartPause} className="btn btn-ghost m-4">{status === EnumStatus.Stopped ? 'START' : 'STOP'}</button>
    </div>
  );
}

export default TomatoApp;
