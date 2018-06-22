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
            // datesSet.push(dataArray[i].dt_txt.slice(0,10));
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
  