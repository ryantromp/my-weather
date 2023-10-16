import React, { useEffect } from "react";
import "./App.css";
import { getWeather, getQueryLocation } from "./api";
import { LocationData } from "./types";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

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
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <div className="App">
            <div className="weather-container">
              <div className="query-container">
                <TextField
                  id="filled-basic"
                  label="Location"
                  variant="filled"
                  value={query}
                  onChange={handleInputChange}
                />
                <div>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleQuery();
                    }}
                  >
                    Submit
                  </Button>
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
                    <tbody>
                      {queryResults.map((result: any) => {
                        return (
                          <tr key={result.id}>
                            <td>{result.name}</td>
                            <td>{result.area}</td>
                            <td>{result.country}</td>
                            <td>{result.latitude}</td>
                            <td>{result.longitude}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleLocationSelected(result.id)
                                }
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="results-container">
                <div>Temperature: {temperature}</div>
              </div>
            </div>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
