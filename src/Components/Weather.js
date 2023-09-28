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
          placeholder="Country / City / Lat & Long"
          className="weather-input-data"
          required
          value={inputdata}
          onChange={onchangeHandler}
        />
        <button className="weather-search-button" type="submit">
          Search
        </button>

        {weatherData !== undefined && apistatus ? (
          <div
            style={{ margin: 0, padding: 0, display: "flex", flexWrap: "wrap" }}
          >
            <img
              src={weatherData.current.condition.icon}
              style={{ width: "30px", height: "30px" }}
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
          {inputdata.toLowerCase() !==
          weatherData.location.name.toLowerCase() ? (
            <p>Did you mean {weatherData.location.name} ?</p>
          ) : (
            ""
          )}

          <div className="display-weather-container">
            <div className="content-partitioner">
              <div>
                <h1 className="weather-details-text">
                  Name : {weatherData.location.name}
                </h1>
                <h1 className="weather-details-text">
                  Region : {weatherData.location.region}
                </h1>
                <h1 className="weather-details-text">
                  Country : {weatherData.location.country}
                </h1>
                <h1 className="weather-details-text">
                  Time Zone : {weatherData.location.tz_id}
                </h1>
                <h1 className="weather-details-text">
                  Time : {weatherData.location.localtime}
                </h1>
                <h1 className="weather-details-text">
                  Last Updated : {weatherData.current.last_updated}
                </h1>
                <h1 className="weather-details-text">
                  Lat & Long :{" "}
                  {weatherData.location.lat + " , " + weatherData.location.lon}
                </h1>
              </div>
              <div>
                <h1 className="weather-details-text">
                  Temperature (celsius) : {weatherData.current.temp_c}
                </h1>
                <h1 className="weather-details-text">
                  Actual Feel (celsius) : {weatherData.current.feelslike_c}
                </h1>
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
            "Hooray !! no alerts issued for this place"
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
            href="https://github.com/ameya699"
            style={{
              background: "#f9f3cc",
              textDecoration: "none",
              color: "black",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
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
