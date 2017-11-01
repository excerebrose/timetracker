import React, { Component } from 'react';
import classNames from 'classnames';
import Picker from 'react-month-picker';

import ListElement from './ListElement';
import 'react-month-picker/css/month-picker.css';
import '../styles/ListContainer.css';

const moment = require('moment-timezone');

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePickerShow = this.handlePickerShow.bind(this);
    this.handleAMonthChange = this.handleAMonthChange.bind(this);
  }

  handlePickerShow() {
    this.monthPicker.show();
  }

  handleAMonthChange(year, month) {
    this.monthPicker.dismiss();
    this.props.monthCallback(year, month-1);
  }

  render() {
    const containerClasses = classNames({
      'list__container': true,
      'list__container--breaks': this.props.interrupt
    });
    const pickerLang = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      , from: 'From', to: 'To'
    }
    const mvalue = {year: 2015, month: 11}
    return (
      <div className={containerClasses}>
        <div className="list__heading">
          <h2>{this.props.header}</h2>
          {this.props.interrupt?
            null
            :
            <div className="list__heading__controls">
            <Picker
              ref={(item) => this.monthPicker = item}
              years={[2017]}
              value={mvalue}
              lang={pickerLang.months}
              onChange={this.handleAMonthChange}
              theme='dark'
            >
              <span className="month_picker" onClick={this.handlePickerShow}>Selected Month: {pickerLang.months[this.props.month]}, {this.props.year}</span>
            </Picker>
            </div>
          }
        </div>
        <table>
          <tbody>
          {this.props.logs.map((val,i) => {
            const time_format = 'h:mm a';
            const start = moment.tz(val.start,'Europe/London');
            let end = 'working';
            let total_mins = ' - - - -';
            if (val.hasOwnProperty('end')) {
              end = moment.tz(val.end,'Europe/London').format(time_format);
              total_mins = (val.total_mins / 60).toFixed(3);
            }
            if (start.month() === this.props.month && start.year() === this.props.year) {
              return (
                <ListElement
                  key={i}
                  name={val.name}
                  date={start.format('dddd, MMM Do')}
                  start={start.format(time_format)}
                  end={end}
                  time={total_mins}
              />
              )      
            }
           return null;
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

ListContainer.defaultProps = {
  interrupt: false,
  logs: []
}
export default ListContainer;