import React, { Component } from 'react';
import ListContainer from './components/ListContainer';
import WorkCounter from './components/WorkCounter';

import './styles/App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: [],
      personal: [],
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth(),
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    fetch('https://dl.dropboxusercontent.com/s/rqyk1e37gf8zbn4/.time-sheet.json?dl=0')
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        work: data.work.filter((val) => (!val.tags || (val.tags && val.tags.indexOf('interrupt') === -1 )) && val.name !== 'personal-project'),
        personal: data.work.filter((val) => (val.tags && val.tags.indexOf('interrupt') > -1) || (val.name === 'personal-project')),
      })
    }).catch((error) => {
      console.log(error);   
    })
  }

  handleDateChange(year, month) {
    this.setState({
      year,
      month,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App__left">
          <ListContainer
            header={"Work"}
            logs={this.state.work}
            monthCallback={this.handleDateChange}
            year={this.state.year}
            month={this.state.month}
          />
        </div>
        <div className="App__right">
          <WorkCounter
            work={this.state.work}
            breaks={this.state.personal}
            year={this.state.year}
            month={this.state.month}
          />
          <ListContainer
            interrupt={true}
            header={"Personal"}
            logs={this.state.personal}
            monthCallback={this.handleDateChange}
            year={this.state.year}
            month={this.state.month}
          />
        </div>
      </div>
    );
  }
}

export default App;
