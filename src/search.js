import React from 'react';
import ReactDOM from 'react-dom';
import Header from './index.js'

class SearchCity extends React.Component{
    render(){
        return(
            <div className='weather-app-search'>
                <div className='weather-app-search-bar'><input className='weather-app-search-bar-input' type='search' /></div>
            <Header/>
            </div>
        )
    }
}

export default SearchCity;