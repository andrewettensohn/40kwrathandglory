import { Box, Container } from '@material-ui/core';
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


export default function App() {
  return (
    <div className="App">
      <AppBarHeader />
      <Box mt={10}>
        <Container maxWidth="xs">
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
        </Container>
      </Box>
    </div>
  );
}
