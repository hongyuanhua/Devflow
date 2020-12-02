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
    // await checkSession()
    try {
      console.log("do submit");
      let res = await login(this.state.data.username, this.state.data.password);
      console.log("res: ", res);
      console.log(res.status == 200);
      console.log("res: ", res.body);

      if (res.status == 200) {
        let member = await res.json();
        console.log("member");
        console.log(member);
        localStorage.setItem("memberId", member._id);
        localStorage.setItem("teamId", member.teamId);
        localStorage.setItem("companyId", member.companyId);
        localStorage.setItem("rank", member.rank);
        this.props.history.push("/taskList");
      }
      checkSession();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() { }

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
