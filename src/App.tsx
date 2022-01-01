import { Box, Container, Paper, useMediaQuery } from '@material-ui/core';
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
import { ContentInput } from './components/ContentInput/ContentInput';
import { CharacterSheetLarge } from './components/CharacterSheet/CharacterSheetLarge';
import { ThreatManager } from './components/ThreatManager/ThreatManager';
import { IsSmallScreen } from './helpers/MediaQueryHelper';

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
  const isSmallScreenSize = IsSmallScreen();
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <AppBarHeader />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/characterSheet">
              {isSmallScreenSize && <CharacterSheet />}
              {!isSmallScreenSize && <CharacterSheetLarge />}
            </Route>
            <Route path="/contentInput">
              <ContentInput />
            </Route>
            <Route path="/threatManager">
              <ThreatManager />
            </Route>
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}
