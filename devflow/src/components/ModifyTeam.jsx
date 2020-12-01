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
import { getTeamById, saveTeam } from "../services/fakeTeamService";
import _ from "lodash";
import { getCompanies, getCompanyById } from "../services/fakeCompanyServices";
import { saveCompany } from "./../services/fakeCompanyServices";
class ModifyTeam extends Form {
  state = {
    data: {
      _id: "",
      companyId: "",
      teamName: "",
      teamName: "",
      quote: "",
      teamPic: "",
      tasks: [],
      members: [],
    },
    errors: {},
    text: "Create Team Page",
  };
  schema = {
    _id: Joi.string().required().label("Id"),
    companyId: Joi.string().required().label("Company Id"),
    teamName: Joi.string().required().label("Team Name"),
    leader: Joi.string().required().label("Leader"),
    quote: Joi.string().required().label("Quote"),
    teamPic: Joi.string().required().label("Team Picture"),
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  componentDidMount() {
    const modifyId = this.props.match.params.id;
    const team = getTeamById(modifyId);
    if (modifyId == "new") {
      this.setState({ text: "Create Team Page" });
      return;
    }
    if (!team) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(team),
    });
  }
  mapToViewModel(team) {
    return {
      _id: team._id,
      teamName: team.teamName,
      leader: team.leader,
      teamPic: team.teamPic,
      tasks: team.tasks,
      members: team.members,
      companyId: team.companyId,
      quote: team.quote,
    };
  }
  handleSave = () => {
    saveTeam(this.state.data);
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
              {this.renderInput("companyId", "Company Id", "text")}
              {this.renderInput("teamName", "Team Name", "text")}
              {this.renderInput("leader", "Leader", "text")}
              {this.renderInput("quote", "Quote", "text")}
              {this.renderInput("teamPic", "Team picture", "text")}
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

export default ModifyTeam;
