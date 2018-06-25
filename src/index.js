import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

  class Header extends React.Component {
    render() {
      return (
        <div className='header w3-card-4'>
        <div className='w3-row'>
          <div className='w3-col l6 m12 s12 todaysWeather-relative'>
            <TodaysWeather/>
            </div>
          </div>
        </div>
      );
    }
  }

  
  class TodaysWeather extends React.Component{
    constructor(){
      super();
      this.state = {
        data:{
          sys:{},
          main:{},
          weather:[{}],
          wind:{}
        },
        ico:'',
        temp:0
      }
      this.renderData();
    }

    renderData(){
      navigator.geolocation.getCurrentPosition((location)=>{
        if(!location.coords){
          alert('Location Not Found');
        }else{
          axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=22ea153019299dbbb2ee4028bd3ff603`)
          .then((weatherInf)=>{
            this.setState({data:weatherInf.data,ico:`http://openweathermap.org/img/w/${weatherInf.data.weather[0].icon}.png`,temp:parseInt(weatherInf.data.main.temp - 273.15)});
          })
        }
      })
    }

    render(){
      return generateCard(this.state);
    }
  }

  class Content extends React.Component{
    constructor(){
      super();
      this.state = {
        data:{
          sys:{},
          main:{},
          weather:[{}],
          wind:{}
        },
        ico:'',
        temp:0
      }
      this.renderDataContent();
    }

    filterDataWithDate(dataArray){
      return new Promise(function(resolve,reject){
        let datesSet = [];
        let tempHolder;
        for(let i=0;i<dataArray.length;i++){
          if(tempHolder === dataArray[i].dt_txt.slice(0,10)){
            continue;
          }else{
            tempHolder = dataArray[i].dt_txt.slice(0,10);
            datesSet.push(i); 
          }
        }
        if(datesSet === []){
          reject('Error occured while getting data');
        }else{
          resolve(datesSet);
        }
      })
    }
    renderDataContent(){
      navigator.geolocation.getCurrentPosition((location)=>{
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=22ea153019299dbbb2ee4028bd3ff603`)
        .then((weatherInfo)=>{
          this.filterDataWithDate(weatherInfo.data.list)
          .then((indexes)=>{
            for(let index of indexes){
              console.log(weatherInfo.data.list[index]);
              // This is where everything is going to happen
              // icon = 'http://openweathermap.org/img/w/'+weatherInfo.data.list[index].weather[0].icon+'.png'
              this.setState({data:weatherInfo.data.list[0],ico:`http://openweathermap.org/img/w/${weatherInfo.data.list[0].weather[0].icon.slice(0,2)}d.png`,temp:parseInt(weatherInfo.data.list[0].main.temp - 273.15)});
            }
          })
          .catch((err)=>{
            console.log(err);
          });
  
        })
        .catch((err)=>{
          console.log(err);
        })
      })

    }

    render(){
      return generateCard(this.state);
    }
  }

  function generateCard(state){
    return (
      <div className='todaysWeather-container'>
      <div className='todaysWeather w3-card-4'>
        <img className='todaysWeather-logo' src={state.ico} alt='logo' /><br/> 
        <h1 className='todaysWeather-temp w3-card-4'>{state.temp} <small><small><sup><sup>o</sup>C</sup></small></small></h1><br/>
        <h3>{state.data.name}, {state.data.sys.country}</h3>
        <center><hr/></center>
        <div className='w3-row todaysWeather-moreinfo'>
          <div className='w3-col'>
            <h3 className='todaysWeather-mainName'>{state.data.weather[0].main} : </h3><h3>{state.data.weather[0].description}</h3><br/>
            <h5>Wind Speed : {state.data.wind.speed} m/sec</h5><br/>
            <h5>Humidity : {state.data.main.humidity}%</h5><br/>
            <h5>Pressure : {state.data.main.pressure} hPa</h5><br/>
          </div>
        </div>
      </div>
      </div>
    )
  }

  
  class Website extends React.Component {
    render() {

      return (
        <div className="weather-app">
          <Header/>
          <div className="weather-app-content">
          <br/>
          <br/>
           <center><h2 className='weather-heading1'><b>Weather next few days</b></h2></center><br/>
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
  