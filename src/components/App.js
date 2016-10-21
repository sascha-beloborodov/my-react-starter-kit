import React, { Component } from 'react';
import xhr from 'xhr';

class App extends Component {

  constructor() {
    super();
    this.state = {
      location: '',
      data: {
        list: null
      }
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(e) {
    e.preventDefault();
    let location = encodeURIComponent(this.state.location);
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID=58fffadf79044d44306c848238f6a52a&units=metric';
    let url = urlPrefix + location + urlSuffix;
    let self = this;
    xhr({
      url: url
    }, function(err, data) {
      self.setState({
        data: JSON.parse(data.body)
      });
    });
  }

  changeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  render() {
    let currentTemp = 'not loaded';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div> 
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label> Where?
            <input 
              placeholder={"City, Country"}
              value={this.state.location}
              onChange={this.changeLocation}
              type="text"
            />
          </label>
        </form>
        <div className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">C</span>
        </div>
      </div>
    );
  }
  
}

export default App;
