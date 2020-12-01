import React from "react";
import Joi from "joi-browser";

import pic from "./logo.jpg";
import Form from "./common/form.jsx";
import Logo from "./logo.jsx";
import TaskList from "./taskList.jsx";

import "./login.css";
import { Route } from "react-router-dom";
import { login, checkSession } from "../services/authService";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //call the server
    // await
    try {
      console.log("do submit");
      await login(this.state.data.username, this.state.data.password);
      this.props.history.push("/taskList");
    } catch (error) {
      console.log(error);
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
            {this.renderInput("username", "Username", "text")}
            {this.renderInput("password", "Password", "password")}
            <br></br>
            {this.renderButton("submit", "Login")}{" "}
            {this.renderButton("button", "Forget Password")}
          </form>
          <br></br>
          <a
            href="./register"
            className="btn btn-primary btn-lg "
            tabIndex="-1"
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
