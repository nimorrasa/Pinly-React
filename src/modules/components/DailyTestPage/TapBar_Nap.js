import React, { useState, useEffect } from "react";
import './text.css';
import './formbtn.css';
import "./progress-bar.css";

//https://alligator.io/react/react-hooks/
// pass percentRange state through props to Range an ProgressBar components
const Range = props => {
  return (
    // render current the filled range of progress bar along its width
    <div className="range" style={{ width: `${props.percentRange}%` }} />
  );
};

const ProgressBar = props => {
  return (

    <div className="progress-bar">
      {/*render available progress bar’s limit*/}
      <Range percentRange={props.percentRange} />
    </div>
  );
};

function EffectedFn() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 24);
  });

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <span>All Done!</span>}
    </div>
  );
}

export const TapBar_Nap = () => {
  let [percentRange, setProgress] = useState(0);

  return (
      <div className="container" fluid="true">
      <div>
      <h1>{percentRange == 500 ? `500 Mins ! Too Much!!` : `Nap :  ${percentRange} Mins`}</h1>
      <div className="positionbar">
        <ProgressBar percentRange={percentRange}/>
        </div>
      <div className="toggle-buttons button">
        <button className="btn btn-link" onClick={() => setProgress(percentRange < 500 ? percentRange - 10 : 500) }><h1>-</h1></button>
        <button className="btn btn-link" onClick={() => setProgress(percentRange < 500 ? percentRange + 10 : 500) }><h1>+</h1></button>
        <button className="btn btn-link" onClick={() => setProgress(0)}><span>Reset</span></button>
      </div>
      </div>
      </div>
    
  );
};

export default TapBar_Nap;