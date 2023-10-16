import React, { useEffect } from "react";
import "./App.css";
import { getWeather, getQueryLocation } from "./api";
import { LocationData } from "./types";

function App() {
  const [temperature, setTemperature] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [queryResults, setQueryResults] = React.useState([]);
  const [showQueryResults, setShowQueryResults] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQuery = () => {
    getQueryLocation(query).then((data: any) => {
      setQueryResults(data);
      setShowQueryResults(true);
    });
  };

  const handleLocationSelected = (id: number) => {
    const selectedLocation = queryResults.find(
      (location: LocationData) => location.id === id
    );
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation;
      getWeather(latitude, longitude).then((data: any) => {
        setTemperature(data.temperature);
      });
    }
  };

  return (
    <div className="App">
      <div className="weather-container">
        <div className="query-container">
          Enter Location:{" "}
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
          />
          <div>
            <button type="button" onClick={handleQuery}>
              Submit
            </button>
          </div>
        </div>

        {showQueryResults && (
          <div className="results-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Area</th>
                  <th>Country</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th></th>
                </tr>
              </thead>
              {queryResults.map((result: any) => {
                return (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.area}</td>
                    <td>{result.country}</td>
                    <td>{result.latitude}</td>
                    <td>{result.longitude}</td>
                    <td>
                      <button onClick={() => handleLocationSelected(result.id)}>
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}

        <div className="results-container">
          <div>Temperature: {temperature}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
