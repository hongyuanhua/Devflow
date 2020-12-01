import React from "react";
import Joi, { flatten } from "joi-browser";

import pic from "./logo.jpg";
import Form from "./common/form.jsx";
import Logo from "./logo.jsx";

class Register extends Form {
  state = {
    data: {
      company: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
    },
    errors: {},
    bo: false,
  };

  schema = {
    company: Joi.string().required().label("Company"),
    Username: Joi.string().required().label("Username"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    password: Joi.string().required().label("Password"),
    password2: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    if (!(this.state.data.password === this.state.data.password2)) {
      console.log("Password does not match");
      this.state.bo = true;
      return;
    } else {
      this.state.bo = false;
    }
    //call the server
    console.log(this.state.data);
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
            {this.renderInput("username", "Username", "text")}
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
