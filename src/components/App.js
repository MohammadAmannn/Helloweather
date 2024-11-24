import React, { useState } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: null,
    error: false,
  });

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      if (!query) return; // Prevent empty searches
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: null, loading: false, error: true });
        console.error("Error fetching weather data:", error);
      }
    }
  };

  return (
    <div className="App">
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && <h4>Searching...</h4>}

      {weather.error && (
        <div className="error-message">
          <span>Sorry, city not found. Please try again.</span>
        </div>
      )}

      {weather.data && weather.data.condition && (
        <Forecast weather={weather} />
      )}
    </div>
  );
}

export default App;
