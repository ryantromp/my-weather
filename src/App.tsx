import React, { useEffect } from "react";
import "./App.css";
import { getWeather, getQueryLocation } from "./api";
import { LocationData } from "./types";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [showTemperature, setShowTemperature] = React.useState(false);
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
      setShowTemperature(false);
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
      setShowQueryResults(false);
      setShowTemperature(true);
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <div className="App">
            <div className="weather-container">
              <TextField
                id="filled-basic"
                label="Location"
                variant="filled"
                value={query}
                onChange={handleInputChange}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  handleQuery();
                }}
              >
                Submit
              </Button>

              {showQueryResults && (
                <List disablePadding>
                  {queryResults.map((result: any) => {
                    return (
                      <ListItem key={result.id}>
                        <ListItemButton
                          onClick={() => handleLocationSelected(result.id)}
                        >
                          <ListItemText
                            primary={result.name}
                            secondary={result.country}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              )}

              {showTemperature && (
                <div className="results-container">
                  <div>Temperature: {temperature}</div>
                </div>
              )}
            </div>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
