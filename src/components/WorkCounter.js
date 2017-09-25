import React from 'react';

import '../styles/WorkCounter.css';
const moment = require('moment-timezone');

const reduceFunc = (arr, year, month) => {
  const hours = arr.reduce((sum, val) => {
    const current_date =  moment.tz(val.start,'Europe/London');
    if (current_date.month() === month && current_date.year() === year && val.hasOwnProperty('total_mins') ) {
      return (sum + val.total_mins)
    }
    return sum;
  }, 0);
  return hours;
}

const WorkCounter = ({ work, breaks, year, month}) => {
  const workHours = reduceFunc(work, year, month);
  const breakHours = reduceFunc(breaks, year, month);
  
  return(
    <div className="work-counter">
      <div className="work-counter__work">{(workHours / 60).toFixed(3)} <span>Hours</span></div>
      <div className="work-counter__break">Total Breaks: {(breakHours / 60).toFixed(3)} hours</div>
    </div>
  )
}

export default WorkCounter;