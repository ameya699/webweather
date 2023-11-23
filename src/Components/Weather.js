import React, { useState } from "react";
import "../Styles/Weather.css";
 
const Weather = () => {
  const [inputdata, setinputdata] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [apistatus, setapistatus] = useState(true);
  const [forcastData, setForcastData] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = "https://api.weatherapi.com/v1/current.json";
  const FORCASTURL = "https://api.weatherapi.com/v1/forecast.json";

  const onchangeHandler = (e) => {
    setinputdata(e.target.value);
    setWeatherData();
  };

  const getCurrentLocationUpdate=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude.toFixed(2);
        const longitude = position.coords.longitude.toFixed(2);
        setinputdata(`${latitude},${longitude}`);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
 
      });
    } 
  }
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (inputdata.trim() !== "") {
      const data = await fetch(`${URL}?q=${inputdata}&key=${API_KEY}`);
      const finData = await data.json();
      const statusCode = await data.status;
      if (statusCode != 200) {
        setapistatus(false);
        setWeatherData();
      } else {
        setapistatus(true);
      }

      const forcastdata = await fetch(
        `${FORCASTURL}?q=${inputdata}&days=1&key=${API_KEY}&alerts=yes&days=1`
      );
      const forcastjson = await forcastdata.json();
      setForcastData(forcastjson);
      setWeatherData(finData);
      console.log(weatherData);
    } else {
      alert("Enter Valid Name");
    }
  };
  return (
    <div className="weather-container">
      <form
        style={{
          display: "flex",
          columnGap: "1rem",
          flexWrap: "wrap",
          rowGap: "1rem",
        }}
        onSubmit={onsubmitHandler}
      >
        <input
          type="text"
          placeholder="Country / City / Lat , Long"
          className="weather-input-data"
          required
          value={inputdata}
          onChange={onchangeHandler}
        />
        <button className="weather-search-button" type="submit">
          Search
        </button>
       
        <button style={{border: "0px solid transparent",background:"transparent"}} data-tooltip-content="Get current lat & long"
  data-tooltip-place="top" onClick={getCurrentLocationUpdate}><span class="material-symbols-outlined">
  home_pin
  </span></button>
        
        {weatherData !== undefined && apistatus ? (
          <div
            style={{ margin: 0, padding: 0, display: "flex", flexWrap: "wrap",alignItems:"center" }}
          >
            <img
              src={weatherData.current.condition.icon}
              style={{ width: "40px", height: "40px" }}
            />
            <p style={{ margin: 0, padding: 0 }}>
              {weatherData.current.is_day == 0 ? "Night" : "Day"}
            </p>
          </div>
        ) : (
          ""
        )}
      </form>

      {weatherData !== undefined && apistatus ? (
        <div>
          {inputdata.trim().toLowerCase() !==
          weatherData.location.name.toLowerCase() ? (
            <p>Did you mean {weatherData.location.name} ?</p>
          ) : (
            ""
          )}
          <div className="main-container">
          <div className="weather-day-temp-container">
            <div className="weather-temp" style={{whiteSpace:"nowrap"}}>{weatherData.current.temp_c}° C </div>
            <label style={{paddingLeft:"4vh",fontSize:"40px",wordSpacing:"normal"}}>{weatherData.current.condition.text}</label>
            <div className="weather-city">{weatherData.location.name}, {weatherData.location.country}</div>
    
          </div>
          <div className="weather-day">
            <div>{new Date(weatherData.location.localtime.split(" ")[0]).toLocaleString('default',{weekday:"long"})}</div>
            <div style={{wordSpacing:"1px"}}>{`${new Date(weatherData.location.localtime.split(" ")[0]).getDate()} ${new Date(weatherData.location.localtime.split(" ")[0]).toLocaleString('default',{month:"short"})}`}</div>
          </div>
          </div>

          <div className="display-weather-container">
            <div className="content-partitioner">
              <div>
              {/* {new Date(0).toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit',second:'2-digit', hour12: true, timeZone: weatherData.location.tz_id }) } or */}
                <h1 className="weather-details-text">
                  Time : 
                  {weatherData.location.localtime}  
                </h1>
                <h1 className="weather-details-text">
                  Last Updated : {weatherData.current.last_updated}
                </h1>
                <h1 className="weather-details-text">
                  Lat & Long :{" "}
                  {weatherData.location.lat + " , " + weatherData.location.lon}
                </h1>
                <h1 className="weather-details-text">
                  Temperature (celsius) : {weatherData.current.temp_c}°
                </h1>
                <h1 className="weather-details-text">
                  Actual Feel (celsius) : {weatherData.current.feelslike_c}°
                </h1>
              </div>
              <div>
                
                <h1 className="weather-details-text">
                  Precipitation (mm) : {weatherData.current.precip_mm}
                </h1>
                <h1 className="weather-details-text">
                  Cloud Coverage (%) : {weatherData.current.cloud}
                </h1>
                <h1 className="weather-details-text">
                  Humidity (%) : {weatherData.current.humidity}
                </h1>
                <h1 className="weather-details-text">
                  Wind Direction & Speed (Kph) :{" "}
                  {weatherData.current.wind_kph +
                    "," +
                    weatherData.current.wind_dir}
                </h1>
                <h1 className="weather-details-text">
                  Overall Weather : {weatherData.current.condition.text}
                </h1>
              </div>
            </div>
          </div>
          <p
            className="weather-search-button"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Alerts
          </p>
          {forcastData == undefined && forcastData.alerts.alert.length > 0 ? (
            <p>Attention!!! {forcastData.alerts.alert[0]}</p>
          ) : (
            <p style={{color: "#1e1e1e",

              fontSize: "16px",
              fontStyle:"normal",
              fontWeight: "800",
              lineHeight: "normal"}}>Hooray !! no alerts issued for this place</p>
          )}
        </div>
      ) : apistatus == false ? (
        <h1 style={{ color: "red", fontSize: "12px", paddingTop: "1rem" }}>
          No Records Found , Please Enter Valid Details
        </h1>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://ameya699.github.io/ameyaawatade.github.io/"
            target="_blank"
            style={{
              marginTop: "1rem",
              display: "flex",
              background: "#f9f3cc",
              textDecoration: "none",
              color: "black",
              borderRadius: "7px",
              width: "300px",
              textAlign: "center",
              fontWeight: "800 ",
              minHeight: "24px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
            }}
          >
            Developed by Ameya Awatade
          </a>
        </p>
      )}
    </div>
  );
};

export default Weather;
