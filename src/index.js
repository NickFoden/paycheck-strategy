import * as Navi from "navi";
import React from "react";
import ReactDOM from "react-dom";
import pages from "./pages";
import App from "./App";
import "./styles.css";

Navi.app({
  pages,
  context: {},

  exports: App,

  async main() {
    let navigation = Navi.createBrowserNavigation({
      pages
    });
    await navigation.steady();

    let hasStaticContent = process.env.NODE_ENV === "production";
    let renderer = hasStaticContent ? ReactDOM.hydrate : ReactDOM.render;

    renderer(<App navigation={navigation} />, document.getElementById("root"));
  }
});
