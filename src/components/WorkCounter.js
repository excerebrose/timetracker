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
      <div className="work-counter__work">{Math.round(workHours / 60)} <span>Hours</span></div>
      <div className="work-counter__break">Personal Project Hours: {Math.round(breakHours / 60)} hours</div>
    </div>
  )
}

export default WorkCounter;