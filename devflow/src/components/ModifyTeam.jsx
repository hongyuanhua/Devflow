import React, { Component } from "react";
// import logo from './logo.svg';
import NavBar from "./common/navBar";
import Form from "./common/form";
import Joi from "joi-browser";
import MemberTable from "../components/adminMemberTable";
import { getTeamById } from "../services/teamService";
import _ from "lodash";
import { addTeam, modifyTeam } from "../services/adminService";
class ModifyTeam extends Form {
  state = {
    data: {
      _id: "",
      companyId: "",
      teamName: "",
      leader: "",
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
  async componentDidMount() {
    const modifyId = this.props.match.params.id;
    const tmp = await getTeamById(modifyId);
    const team = await tmp.json();
    if (modifyId == "new") {
      this.setState({ text: "Modify Team Page" });
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
  doSubmit = async () => {
    //call the server
    // await
    try {
      console.log("do submit");
      if (this.props.match.params._id == "new") {
        await addTeam(this.state.data);
      } else {
        modifyTeam(this.state.data);
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
              {/* {this.props.location.pathname != "/mt/new"&&this.renderInput("_id", "ID", "text")} */}
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

export default ModifyTeam;
