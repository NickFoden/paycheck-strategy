import React, { Component } from "react";
import { NavProvider, NavRoute, NavNotFoundBoundary } from "react-navi";
import Burger from "./Components/burger";

class App extends Component {
  componentDidMount() {}
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <div>
          <Burger />
          <main>
            <NavNotFoundBoundary render={renderNotFound}>
              <NavRoute />
            </NavNotFoundBoundary>
          </main>
        </div>
      </NavProvider>
    );
  }
}
function renderNotFound() {
  return (
    <div className="App-error">
      <h1>404 - Not Found</h1>
    </div>
  );
}

export default App;
