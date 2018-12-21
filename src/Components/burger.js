import React, { Component } from "react";
import { NavLink } from "react-navi";
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
          <h1 className="App-title">Paycheck Strategy</h1>
        </header>
        {/*https://github.com/negomi/react-burger-menu */}

        <Menu>
          <NavLink id="home" className="menu-item" href="/">
            Home
          </NavLink>
          <NavLink id="savings" className="menu-item" href="/Savings">
            Savings
          </NavLink>
          <NavLink id="future" className="menu-item" href="/Future">
            Future
          </NavLink>
        </Menu>
      </div>
    );
  }
}

export default Burger;
