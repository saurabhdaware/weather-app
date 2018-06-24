import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

  class Header extends React.Component {
    render() {
      return (
        <div className='header'>        
          <TodaysWeather/>
        </div>
      );
    }
  }

  class TodaysWeather extends React.Component{
    render(){
      axios.get('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=22ea153019299dbbb2ee4028bd3ff603')
      .then((weatherInfo)=>{
        
      })
      return (
        <div className='todaysWeather'><h2>Weather</h2></div>
      )
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

    render(){
      axios.get('http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=22ea153019299dbbb2ee4028bd3ff603')
      .then((weatherInfo)=>{
        this.filterDataWithDate(weatherInfo.data.list)
        .then((indexes)=>{
          for(let index of indexes){
            console.log(weatherInfo.data.list[index]);
            // This is where everything is going to happen
            // icon = 'http://openweathermap.org/img/w/'+weatherInfo.data.list[index].weather[0].icon+'.png';
            let img = document.createElement('img');
            img.src ='http://openweathermap.org/img/w/'+weatherInfo.data.list[index].weather[0].icon+'.png';
            document.getElementById('icons').appendChild(img);
 
          }
        })
        .catch((err)=>{
          console.log(err);
        });

      })
      .catch((err)=>{
        console.log(err);
      })
      return(
        <div id='icons'></div>
      );
    }
  }
  
  class Website extends React.Component {
    render() {

      return (
        <div className="weather-app">
          <Header/>
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
  