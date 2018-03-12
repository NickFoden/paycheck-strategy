import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./menu.css";

class Burger extends Component {
  componentDidMount() {}
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Paycheck Strat</h1>
        </header>
        {/*https://github.com/negomi/react-burger-menu */}

        <Menu>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="savings" className="menu-item" href="/savings">
            Savings
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
        </Menu>
      </div>
    );
  }
}

export default Burger;
