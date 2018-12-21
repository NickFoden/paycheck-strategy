import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { date, SingleDatePicker } from "react-dates";
import moment from "moment";

class Savings extends Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      payDay: "When is next pay day ?",
      payOffDay: "Let's get rid of this bill",
      payDayDate: null,
      payDayFocused: false,
      payOffFocused: false,
      savingsAmount: 0,
      paymentAmount: 0,
      resultDate: "",
      resultPayments: 0
    };
    this.compute = this.compute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSavingsAmountSubmit = this.handleSavingsAmountSubmit.bind(this);
    this.handlePayChange = this.handlePayChange.bind(this);
    this.handlePaySubmit = this.handlePaySubmit.bind(this);
  }
  //   componentDidMount() {}
  //   showSettings(event) {
  //     event.preventDefault();
  //   }

  handleChange(event) {
    this.setState({ savingsAmount: event.target.value });
  }
  handleSavingsAmountSubmit(event) {
    document.getElementById("savings-amount-form").reset();
    console.log("Submitted saving goal of " + this.state.savingsAmount);
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
    let number = Math.ceil(
      (
        parseInt(this.state.savingsAmount.replace(/[^0-9.]/g, ""), 10) /
        parseInt(this.state.paymentAmount.replace(/[^0-9.]/g, ""), 10)
      ).toFixed(2)
    );

    this.setState({ resultPayments: number });
    if (number === 1) {
      let finalDate = moment(this.state.payDayDate);
      this.setState({ resultDate: finalDate });
    } else {
      let finalDate = moment(this.state.payDayDate)
        .add(14 * (number - 1), "day")
        .format("LLL");
      this.setState({ resultDate: finalDate });
    }
  }

  render() {
    const payDayDate =
      moment(this.state.payDay).format("MMM Do YY") === "Invalid date"
        ? this.state.payDay
        : moment(this.state.payDay).format("MMM Do YY");
    const resultDate =
      moment(this.state.resultDate).format("MMM Do YY") === "Invalid date"
        ? this.state.resultDate
        : moment(this.state.resultDate).format("MMM Do YY");

    return (
      <div className="App">
        <h1>Savings date projector </h1>
        <h4>( Currently assumes you get paid biweekly)</h4>
        <div className="app-body">
          <div className="paycheck">
            <h2>Paycheck Date</h2>
            <h3>{payDayDate}</h3>
            <SingleDatePicker
              id="date_input"
              date={this.state.payDayDate}
              focused={this.state.payDayFocused}
              onDateChange={date => this.setState({ payDayDate: date })}
              onFocusChange={() =>
                this.setState({ payDayFocused: !this.state.payDayFocused })
              }
            />
            {/* <h2>Lets assume you get paid every 2 weeks?</h2> */}
            {/* <input type="radio" id="radioButton" />
            <label htmlFor="radioButton">
              <h3>Yes</h3>
            </label> */}
          </div>
          <div className="savings">
            <h2>Savings Goal Amount</h2>
            <h3>${JSON.stringify(this.state.savingsAmount)}</h3>
            <form
              id="savings-amount-form"
              onSubmit={this.handleSavingsAmountSubmit}
            >
              <input
                type="text"
                id="savings-amount"
                value={this.state.savingsAmount}
                onChange={this.handleChange}
              />
            </form>
          </div>
          <div>
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
        </div>
        <div className="result-div">
          <button id="compute" onClick={this.compute}>
            Compute
          </button>
          {resultDate ? (
            <h3>
              In {this.state.resultPayments} paycheck
              {this.state.resultPayments > 1 ? "s" : ""} from now, on the day of{" "}
              {resultDate} you will have reached your goal of ${" "}
              {this.state.savingsAmount}
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Savings;
