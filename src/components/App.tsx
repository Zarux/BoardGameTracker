import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
import LandingPage from "./landing-page/LandingPage";
import Room from "./main/Room";

class App extends Component {
  render() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div>
                <Route path="/" exact component={LandingPage} />
                <Route path="/:room" component={Room} />
            </div>
        </Router>
    );
  }
}

export default App;
