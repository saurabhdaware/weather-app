import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

  class Navbar extends React.Component {
    render() {
      return (
        <h1>Navbar</h1>
      );
    }
  }

  class Content extends React.Component{
    constructor(){
      super();
      this.state={
        name:'',
        mainData:{},
        icon:'',
      }
    }
    render(){
      axios.get('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=ef5f4331f2a1bbacf3b7f7924e9f9eb7')
      .then((weatherInfo)=>{
        console.log(weatherInfo.data);
      })
      return(
        <h1>Content</h1>
      )
    }
  }
  
  class Website extends React.Component {
    render() {
      return (
        <div className="weather-app">
          <div className="weather-app-navbar">
            <Navbar/>
          </div>
          <div className="weather-app-content">
            <Content/>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Website />,
    document.getElementById('root')
  );
  