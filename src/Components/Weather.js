import React, { useState } from "react";
import "../Styles/Weather.css";
const Weather = () => {
  const [inputdata, setinputdata] = useState("");
  const onchangeHandler = (e) => {
    setinputdata(e.target.value);
  };
  const onsubmitHandler = (e) => {
    e.preventDefault();
    console.log(inputdata);
  };
  return (
    <div className="weather-container">
      <form
        style={{ display: "flex", columnGap: "1rem" }}
        onSubmit={onsubmitHandler}
      >
        <input
          type="text"
          placeholder="Pincode / Country / City / Lat & Long"
          className="weather-input-data"
          required
          value={inputdata}
          onChange={onchangeHandler}
        />
        <button className="weather-search-button" type="submit">
          Search
        </button>
      </form>
      <div className="display-weather-container">
        <div className="content-partitioner">
          <div>
            <h1 className="weather-details-text">Name</h1>
            <h1 className="weather-details-text">Region</h1>
            <h1 className="weather-details-text">Country</h1>
            <h1 className="weather-details-text">Name</h1>
            <h1 className="weather-details-text">Region</h1>
            <h1 className="weather-details-text">Country</h1>
            <h1 className="weather-details-text">Lat & Long</h1>
          </div>
          <div>
            <h1 className="weather-details-text">Name</h1>
            <h1 className="weather-details-text">Region</h1>
            <h1 className="weather-details-text">Country</h1>
            <h1 className="weather-details-text">Name</h1>
            <h1 className="weather-details-text">Region</h1>
            <h1 className="weather-details-text">Country</h1>
            <h1 className="weather-details-text">Lat & Long</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
