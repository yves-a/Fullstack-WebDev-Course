import { useState, useEffect } from 'react'
import axios from 'axios'
const Weather = ({capital}) => {
    console.log({capital})
    const [weather, setWeather] = useState([]) 
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        console.log('effect')
        axios
          .get("https://api.openweathermap.org/data/2.5/weather?q="+{capital}.capital+"&appid="+api_key+"&units=metric")
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
      }, [])
    if (weather.length!==0){
        const weatherIcon = "http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img src={weatherIcon} alt={weather.weather[0].icon} width="250" height="250"></img>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
        
    } else {
       return (
           <h2>Weather is loading</h2>
       )
    }


}
export default Weather