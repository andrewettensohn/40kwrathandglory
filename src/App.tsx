import { Box, Container, Paper } from '@material-ui/core';
import { AppBarHeader } from './components/AppBarHeader';
import { Home } from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import React from 'react';
import { CharacterSheet } from './components/CharacterSheet/CharacterSheet';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { amber, blueGrey, deepPurple, green, red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: amber,
    secondary: {
      main: red[900]
    },
    background: {
      paper: "#1d1d1d"
    }
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "115vh" }}>
        <AppBarHeader />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/characterSheet">
              <CharacterSheet />
            </Route>
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}
