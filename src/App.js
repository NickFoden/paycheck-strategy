import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/home";
import Savings from "./Components/savings";
import Burger from "./Components/burger";
import Contact from "./Components/contact";

class App extends Component {
  componentDidMount() {}
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Burger />
          <Route exact path="/" component={Home} />
          <Route exact path="/Savings" component={Savings} />
          <Route exact path="/Contact" component={Contact} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
