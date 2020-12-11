import React, { Component } from "react";
// import logo from './logo.svg';
import NavBar from "./common/navBar";
import Form from "./common/form";
import Joi from "joi-browser";
import MemberTable from "../components/adminMemberTable";
import {
  getMemberById,
  getMembersByCompanyId,
  getNotTeamMembersByCompanyId,
} from "./../services/memberService";
import _ from "lodash";
import {
  addMember,
  modifyMember,
  checkSession,
} from "../services/adminService";
class ModifyMember extends Form {
  state = {
    data: {
      _id: "",
      firstName: "",
      lastName: "",
      userName: "",
      rank: "",
      companyId: "",
      teamId: "",
      password: "",
      profilePic: "",
    },
    errors: {},
    text: "Create Member Page",
  };
  schema = {
    _id: Joi.string().required().label("Id"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    userName: Joi.string().required().label("Username"),
    rank: Joi.string().required().label("Rank"),
    companyId: Joi.string().required().label("Company Id"),
    teamId: Joi.string().required().label("Team Id"),
    password: Joi.string().required().label("Password"),
    profilePic: Joi.string().required().label("Profile Picture"),
  };

  async componentDidMount() {
    const modifyId = this.props.match.params.id;
    const tmp = await getMemberById(modifyId);
    const member = await tmp.json();
    if (modifyId == "new") {
      this.setState({ text: "Create Member Page" });
      return;
    }
    if (!member) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(member),
    });
  }
  mapToViewModel(member) {
    return {
      _id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      userName: member.userName,
      rank: member.rank,
      companyId: member.companyId,
      teamId: member.teamId,
      password: member.password,
      profilePic: member.profilePic,
    };
  }
  doSubmit = async () => {
    //call the server
    // await
    try {
      console.log("do submit");
      if (this.props.match.params.id == "new") {
        await addMember(this.state.data);
      } else {
        modifyMember(this.state.data);
      }

      // this.props.history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {console.log(this.state)}
        <div className="row">
          <div className="col-5">
            <h1>{this.state.text}</h1>
            <form onSubmit={this.handleSubmit}>
              {/* {this.renderInput("_id", "Member ID", "text")} */}
              {this.renderInput("firstName", "First Name", "text")}
              {this.renderInput("lastName", "Last Name", "text")}
              {this.renderInput("userName", "Username", "text")}
              {this.props.location.pathname != "/mm/new" &&
                this.renderInput("rank", "Rank", "text")}
              {this.props.location.pathname != "/mm/new" &&
                this.renderInput("companyId", "Company Id", "text")}
              {this.props.location.pathname != "/mm/new" &&
                this.renderInput("teamId", "Team Id", "text")}
              {this.renderInput("password", "Password", "text")}
              {this.renderInput("profilePic", "Profile Picture", "text")}
              <br></br>
            </form>
            <br></br>
            <a
              href="/admin"
              className="btn btn-primary btn-lg "
              tabIndex="-1"
              role="button"
              aria-disabled="false"
              onClick={this.doSubmit}
            >
              Submit
            </a>
            <a
              href="/admin"
              className="btn btn-primary btn-lg "
              tabIndex="-1"
              role="button"
              aria-disabled="false"
            >
              Back
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ModifyMember;
