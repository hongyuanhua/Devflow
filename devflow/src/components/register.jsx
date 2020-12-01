import React from "react";
import Joi, { flatten } from "joi-browser";

import pic from "./logo.jpg";
import Form from "./common/form.jsx";
import Logo from "./logo.jsx";
import { register, checkSession } from "../services/authService";

class Register extends Form {
  state = {
    data: {
      companyName: "",
      userName: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
    },
    errors: {},
    bo: false,
  };

  schema = {
    companyName: Joi.string().required().label("Company"),
    userName: Joi.string().required().label("Username"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    password: Joi.string().required().label("Password"),
    password2: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log(this.state.data);
    if (!(this.state.data.password === this.state.data.password2)) {
      console.log("Password does not match");
      this.state.bo = true;
      return;
    } else {
      this.state.bo = false;
    }
    //call the server
    console.log(this.state.data);
    try {
      console.log("do submit");
      await register(this.state.data);
      this.props.history.push("/login");
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
            {this.renderInput("companyName", "Company", "text")}
            {this.renderInput("userName", "Username", "text")}
            {this.renderInput("firstName", "First Name", "text")}
            {this.renderInput("lastName", "Last Name", "text")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("password2", "Re-enter Password", "password")}
            {this.state.bo && <h4>The Password Does Not Match!</h4>}
            <br></br>
            {this.renderButton("submit", "Register")}
          </form>
        </div>
        <div className="col-1"></div>.
      </div>
    );
  }
}

export default Register;
