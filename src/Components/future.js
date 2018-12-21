import React, { Component } from "react";

class Future extends Component {
  //   constructor() {
  //     super();
  //   }

  render() {
    return (
      <div id="future div">
        <h3 className="blurbs">
          {" "}
          Thank you for checking out this rough draft of one of my side
          projects!
        </h3>

        <div id="features-div">
          <p>List of features to come</p>
          <ol>
            <li> Add log in log out</li>
            <li>
              {" "}
              Encrypt user expense data, maybe SHA, so their savings and expense
              amounts are private from everyone including db admin
            </li>
            <li>
              {" "}
              Enable users logged in to save multiple/all of their planned
              purchases/ planned expenses to enable helpful paycheck planning
            </li>
            <li>
              Monthly Budget integration so user can establish running balance
              to always have available in checkig to cover bills
            </li>
            <li>
              {" "}
              For balances accruing interest, add an interest calculation
            </li>
          </ol>
        </div>
        <h4 className="blurbs">
          You can{" "}
          <a
            href="https://twitter.com/NickFoden"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            @ me{" "}
          </a>{" "}
          or check out what else I have been up to over at{" "}
          <a href=" http://nickis.online/"> Nick Is Online </a>
        </h4>
      </div>
    );
  }
}

export default Future;
