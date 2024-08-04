import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function TomatoApp() {
  const [value, setValue] = useState(6);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-1/2">
        <CircularProgressbar value={value} maxValue={25} text={`${value}:00`} />
      </div> 
      <button onClick={() => setValue(25)} className="btn btn-ghost m-4">Start</button>
    </div>
  );

  
}

export default TomatoApp;
