import React from 'react';

function CircularProgression({ percentage, circleWidth }) {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  let strokeColor;
  if (percentage <= 20) {
    strokeColor = 'green';
  } else if (percentage >= 21 && percentage <= 50) {
    strokeColor = 'orange';
  } else {
    strokeColor = 'red';
  }

  return (
    <div className='circle'>
      <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <circle cx={circleWidth / 2} cy={circleWidth / 2} strokeWidth="15px" r={radius} className="circle-background" />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circle-progress"
          style={{
            stroke: strokeColor,
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text className='text-results' x="50%" y="50%" dy="0.3em" textAnchor="middle">{percentage}%</text>
      </svg>
    </div>
  );
}

export default CircularProgression;
