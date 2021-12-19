import React from 'react';
import '../style/weather.css'

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            city:"Mandsaur",
            displayCity:"Search city",
            temp:"0",
            long:"0",
            lat:"0",
            country:"IN",
            timeZone:"0",humidity:"0",pressure:"0",wind:"0",weather:"0"
        }
      this.fetchfun=this.fetchfun.bind(this);
      this.changeInput=this.changeInput.bind(this);
    }
fetchfun(e){ 
    if(e.keyCode==13){     
      e.target.value="";
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=d7a25f74de8701da31bb2ba06835730f`)
        .then((response) =>{return response.json()})
          .then((data) => {console.log(data);console.log(data.cod)
           if(data.cod===200){
             e.target.value=""
             this.setState({
               displayCity:data.name,
               temp:(data.main.temp-273.15).toFixed(2)+" °C",
               long: "Longatute"+data.coord.lon,
               lat: "Latitute: "+data.coord.lat,
               country:data.sys.country,
               humidity:data.main.humidity,
               pressure:data.main.pressure,
               weather:data.weather.description,
               wind:data.wind.speed,
               timeZone:new Date(data.dt*1000-(data.timezone*1000)).toLocaleString()
             })
      
  console.log((this.state.timeZone).toLocaleString())     }
           else {
            this.setState({
              displayCity:"City not found",
              temp:"",
              long:"0",
            lat:"0",
            country:"IN",
            timeZone:"0",humidity:"0",pressure:"0",wind:"0",weather:"0"
              
            })
           }
          
          });
           
        
        
        }

      }

changeInput(e){
    this.setState({
        city : e.target.value
          
    }) 
  }

render(){
        return(
            <div className='main'>
                <input type="text" onChange={this.changeInput} onKeyUp={this.fetchfun}  value={this.state.city} />
                <h2 id='maincity'>{this.state.displayCity}</h2><p id='country'>{this.state.country}</p>
                <h3 id='temp'>Temp: {this.state.temp}</h3>
                <h4>Humidity:  {this.state.humidity}||  Pressure: {this.state.pressure}</h4>
              <h4> weather: {this.state.weather} || Wind: {this.state.wind}</h4>
                <div id='position'><p> {this.state.lat}</p> <p> {this.state.long}</p></div>

            </div>
        );
    }
}

export default Weather;