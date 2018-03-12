import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { date, SingleDatePicker } from "react-dates";
import moment from "moment";
import "./home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      payDay: "When is next pay day ?",
      payOffDay: "Let's get rid of this bill",
      payDayFocused: false,
      payOffFocused: false,
      purchaseCost: 0,
      paymentAmount: 0,
      resultDate: "",
      resultPayments: 0
    };
    this.compute = this.compute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCostSubmit = this.handleCostSubmit.bind(this);
    this.handlePayChange = this.handlePayChange.bind(this);
    this.handlePaySubmit = this.handlePaySubmit.bind(this);
  }
  // componentDidMount() {}
  // showSettings(event) {
  //   event.preventDefault();
  // }

  handleChange(event) {
    this.setState({ purchaseCost: event.target.value });
  }
  handleCostSubmit(event) {
    document.getElementById("purchase-cost-form").reset();
    console.log("Submitted cost of " + this.state.purchaseCost);
    event.preventDefault();
  }
  handlePayChange(event) {
    this.setState({ paymentAmount: event.target.value });
  }
  handlePaySubmit(event) {
    document.getElementById("payment-amount-form").reset();
    console.log("Submitted cost of " + this.state.paymentAmount);
    event.preventDefault();
  }

  compute() {
    let number = (this.state.purchaseCost / this.state.paymentAmount).toFixed(
      2
    );
    this.setState({ resultPayments: number });
    let finalDate = moment(this.state.payDay)
      .add(14 * number, "day")
      .format("LLL");
    console.log(finalDate);
    this.setState({ resultDate: finalDate });
  }

  render() {
    const payDayDate =
      moment(this.state.payDay).format("MMM Do YY") === "Invalid date"
        ? this.state.payDay
        : moment(this.state.payDay).format("MMM Do YY");
    // const payDayDate = JSON.stringify(this.state.payDay);
    const payOffDate =
      moment(this.state.payOffDay).format("MMM Do YY") === "Invalid date"
        ? this.state.payOffDay
        : moment(this.state.payOffDay).format("MMM Do YY");
    // const payOffDate = JSON.stringify(this.state.payOffDay);
    const resultDate =
      moment(this.state.resultDate).format("MMM Do YY") === "Invalid date"
        ? this.state.resultDate
        : moment(this.state.resultDate).format("MMM Do YY");

    return (
      <div className="App">
        <div className="app-body">
          <div className="paycheck">
            <h2>Paycheck Date</h2>
            <h3>{payDayDate}</h3>
            <SingleDatePicker
              id="date_input"
              date={date}
              focused={this.state.payDayFocused}
              // onDateChange={date => console.log(JSON.stringify(date) + " date")}
              onDateChange={date => this.setState({ payDay: date })}
              onFocusChange={() =>
                this.setState({ payDayFocused: !this.state.payDayFocused })
              }
            />
            <h2>Lets assume you get paid every 2 weeks?</h2>
            <input type="radio" id="radioButton" />
            <label htmlFor="radioButton">
              <h3>Yes</h3>
            </label>

            <h3>
              In {this.state.resultPayments} paychecks from now, on the day of{" "}
              {resultDate} you will be free of your burden
            </h3>
          </div>
          <div className="purchase">
            <h2>Purchase Cost</h2>
            <h3>${JSON.stringify(this.state.purchaseCost)}</h3>
            <form id="purchase-cost-form" onSubmit={this.handleCostSubmit}>
              {/*  HERE*/}
              <input
                type="text"
                id="purchase-cost"
                value={this.state.purchaseCost}
                onChange={this.handleChange}
              />
            </form>
            <h2>Pay off by date</h2>
            <h3>{payOffDate}</h3>
            <SingleDatePicker
              id="date_input"
              date={date}
              focused={this.state.payOffFocused}
              onDateChange={date => this.setState({ payOffDay: date })}
              onFocusChange={() =>
                this.setState({ payOffFocused: !this.state.payOffFocused })
              }
            />
            <h2>Per Check Payment</h2>
            <h3>${JSON.stringify(this.state.paymentAmount)}</h3>
            <form id="payment-amount-form" onSubmit={this.handlePaySubmit}>
              <input
                type="text"
                id="payment-cost"
                value={this.state.paymentAmount}
                onChange={this.handlePayChange}
              />
            </form>
          </div>
          <button id="compute" onClick={this.compute}>
            Compute
          </button>
          {/*} <p>{result}</p>*/}
        </div>
      </div>
    );
  }
}

export default Home;
