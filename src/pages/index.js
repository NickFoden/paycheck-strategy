import { createPage, createSwitch } from "navi";

export default createSwitch({
  paths: {
    "/": createPage({
      title: "Paycheck Strategy",
      getContent: () => import("./home.js")
    }),

    "/Savings": createPage({
      title: "Savings Calculator",
      getContent: () => import("./savings.js")
    }),
    "/Future": createPage({
      title: "Future",
      getContent: () => import("./future.js")
    })
  }
});
