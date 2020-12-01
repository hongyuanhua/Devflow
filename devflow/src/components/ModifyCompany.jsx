import React, { Component } from "react";
// import logo from './logo.svg';
import NavBar from "./common/navBar";
import Form from "./common/form";
import Joi from "joi-browser";
import MemberTable from "../components/adminMemberTable";
import { saveTask } from "../services/fakeTaskService";
import {
  getMemberByCompanyId,
  members,
  deleteMember,
  getMemberByCompanyId_NoTeam,
  saveMemberFromCompany,
} from "./../services/fakeMemberService";

import _ from "lodash";
import { getCompanies, getCompanyById } from "../services/fakeCompanyServices";
import { saveCompany } from "./../services/fakeCompanyServices";
class ModifyCompany extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      members: [],
      bossId: "",
      teams: [],
      companyPic: "",
    },
    errors: {},
    text: "Modify Company Page",
  };
  schema = {
    _id: Joi.string().required().label("Id"),
    name: Joi.string().required().label("Name"),
    bossId: Joi.string().required().label("Boss Id"),
    companyPic: Joi.string().required().label("Pic"),
  };
  componentDidMount() {
    const modifyId = this.props.match.params.id;
    const company = getCompanyById(modifyId);
    if (modifyId == "new") {
      this.setState({ text: "Create Company Page" });
      return;
    }
    if (!company) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(company),
    });
  }
  mapToViewModel(company) {
    return {
      _id: company._id,
      name: company.name,
      members: company.members,
      bossId: company.bossId,
      teams: company.teams,
      companyPic: company.companyPic,
    };
  }
  handleSave = () => {
    saveCompany(this.state.data);
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
              {this.renderInput("_id", "Company ID", "text")}
              {this.renderInput("name", "Company Name", "text")}
              {this.renderInput("bossId", "Boss ID", "text")}
              {this.renderInput("companyPic", "Company picture", "text")}
              <br></br>
            </form>
            <br></br>
            <a
              href="/admin"
              className="btn btn-primary btn-lg "
              tabindex="-1"
              role="button"
              aria-disabled="false"
              onClick={this.handleSave}
            >
              Submit
            </a>
            <a
              href="/admin"
              className="btn btn-primary btn-lg "
              tabindex="-1"
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

export default ModifyCompany;
