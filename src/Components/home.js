import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      payDay: "When is next pay day ?",
      payOffDay: "Let's get rid of this bill",
      payDayDate: null,
      payDayFocused: false,
      payOffFocused: false,
      purchaseCost: 0,
      paymentAmount: 0,
      resultDate: "",
      resultPayments: 0
    };
    this.paymentAmountRef = React.createRef();
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
    if (
      this.state.purchaseCost &&
      this.state.paymentAmount &&
      this.state.payDayDate
    ) {
      let number = (
        parseInt(this.state.purchaseCost.replace(/[^0-9.]/g, ""), 10) /
        parseInt(this.state.paymentAmount.replace(/[^0-9.]/g, ""), 10)
      ).toFixed(2);
      this.setState({ resultPayments: Math.ceil(number) });
      if (number === 1) {
        let finalDate = moment(this.state.payDayDate);
        this.setState({ resultDate: finalDate });
      } else {
        let finalDate = moment(this.state.payDayDate)
          .add(14 * (number - 1), "day")
          .format("LLL");
        this.setState({ resultDate: finalDate });
      }
    } else if (this.state.payDayDate === null) {
      this.setState({ payDayFocused: true });
    } else if (this.state.paymentAmount === "") {
      this.paymentAmountRef.current.focusTextInput();
    } else if (this.state.purchaseCost === "") {
      document.getElementById("purchase-cost").focus();
    }
  }

  render() {
    const resultDate =
      moment(this.state.resultDate).format("MMM Do YY") === "Invalid date"
        ? this.state.resultDate
        : moment(this.state.resultDate).format("MMM Do YY");

    return (
      <div className="App">
        <h1>Pay off expense date projector </h1>
        <h4>( Currently assumes you get paid biweekly)</h4>
        <div className="app-body">
          <div>
            <h2>Paycheck Date</h2>
            <SingleDatePicker
              id="date_input"
              date={this.state.payDayDate}
              focused={this.state.payDayFocused}
              onDateChange={date => this.setState({ payDayDate: date })}
              onFocusChange={() =>
                this.setState({ payDayFocused: !this.state.payDayFocused })
              }
            />
            {/* <h2>Lets assume you get paid every 2 weeks?</h2>
            <input type="radio" id="radioButton" />
            <label htmlFor="radioButton">
              <h3>Yes</h3>
            </label> */}
          </div>
          <div>
            <h2>Purchase Cost</h2>
            <form id="purchase-cost-form" onSubmit={this.handleCostSubmit}>
              {/*  HERE*/}
              <input
                type="text"
                id="purchase-cost"
                value={this.state.purchaseCost}
                onChange={this.handleChange}
              />
            </form>
            <h3>${JSON.stringify(this.state.purchaseCost)}</h3>
            {/* <h2>Pay off by date</h2>
            <h3>{payOffDate}</h3>
            <SingleDatePicker
              id="date_input"
              date={date}
              focused={this.state.payOffFocused}
              onDateChange={date => this.setState({ payOffDay: date })}
              onFocusChange={() =>
                this.setState({ payOffFocused: !this.state.payOffFocused })
              }
            /> */}
          </div>
          <div>
            <h2>Per Check Payment</h2>
            <form id="payment-amount-form" onSubmit={this.handlePaySubmit}>
              <input
                ref={this.paymentAmountRef}
                type="text"
                id="payment-cost"
                value={this.state.paymentAmount}
                onChange={this.handlePayChange}
              />
            </form>
            <h3>${JSON.stringify(this.state.paymentAmount)}</h3>
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
              {resultDate} you will be free of your burden
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Home;
