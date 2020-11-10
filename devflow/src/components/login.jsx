import React from "react";
import Joi from "joi-browser";

import pic from "./logo.jpg";
import Form from "./form.jsx";
import Logo from "./logo.jsx";
import TaskList from "./taskList.jsx";

import "./login.css";
import { Route } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      company: "",
      eid: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    company: Joi.string().required().label("Company"),
    eid: Joi.string().required().label("Employee ID"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //call the server
    console.log(this.state.data);
    if (
      this.state.data.company === "Apple" &&
      this.state.data.eid === "admin" &&
      this.state.data.password === "admin"
    ) {
      const taskList = "./taskList";
      this.props.history.push(taskList);
    }
  };

  render() {
    return (
      <div className="row">
        {/* placeholder for logo */}
        <div className="col">
          <Logo Logo={pic} />
        </div>
        <div className="col-5">
          <h1>Welcome to Devflow</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("company", "Company", "text")}
            {this.renderInput("eid", "Employee ID", "text")}
            {this.renderInput("password", "Password", "password")}
            <br></br>
            {this.renderButton("submit", "Login")}{" "}
            {this.renderButton("button", "Forget Password")}
          </form>
          <br></br>
          <a
            href="./register"
            className="btn btn-primary btn-lg "
            tabindex="-1"
            role="button"
            aria-disabled="false"
          >
            Register
          </a>
        </div>
        <div className="col-1"></div>
      </div>
    );
  }
}

export default Login;
