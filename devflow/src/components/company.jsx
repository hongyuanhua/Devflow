import React, { Component } from "react";
import NavBar from "./common/navBar";
import "./personal.css";
import { getNotificaitons } from "../services/fakeNotificationServices";
import { getCompanyById } from "../services/fakeCompanyServices";
import { getTeamsByCompanyId } from "../services/fakeTeamService.js";
import {
  getMemberById,
  getMemberByCompanyId_NoTeam,
  getFullNameById,
} from "../services/fakeMemberService.js";
import { Link } from "react-router-dom";
import CompanyTable from "./companyTable";
import MemberTable from "./memberTable";
import _ from "lodash";

class Company extends Component {
  state = {
    data: {
      _id: "",
      firstName: "First Name",
      lastName: "Last Name",
      rank: 10000,
      teamId: "placeholder",
      quote: "placeholder",
    },
    company: getCompanyById(this.props.match.params.id),
    teams: getTeamsByCompanyId(this.props.match.params.id),
    boss: getMemberById(getCompanyById(this.props.match.params.id).bossId),
    members: getMemberByCompanyId_NoTeam(this.props.match.params.id),
    sortColumn: { path: "teamName", order: "asc" },
    sortColumn2: { path: "firstName", order: "asc" },
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSort2 = (sortColumn2) => {
    this.setState({ sortColumn2 });
  };

  render() {
    // console.log("this.state.teams", this.state.teams);
    // console.log(this.props.match.params.id);
    const organizedTeamData = _.orderBy(
      this.state.teams,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    // console.log("organizedTeamData", organizedTeamData);
    for (let t in organizedTeamData) {
      // console.log(t);
      organizedTeamData[t].leaderName = getFullNameById(
        organizedTeamData[t].leader
      );
      organizedTeamData[t].leaderPic = getMemberById(
        organizedTeamData[t].leader
      ).profilePic;
    }

    const organizedMemberData = _.orderBy(
      this.state.members,
      [this.state.sortColumn2.path],
      [this.state.sortColumn2.order]
    );

    for (let t in organizedMemberData) {
      organizedMemberData[t].name = getFullNameById(organizedMemberData[t]._id);
    }
    console.log(organizedMemberData);
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="row">
            <div id="personalInfo" className="col-4">
              <img src={this.state.company.companyPic} />
              <h1>Welcome to {this.state.company.name}</h1>
              <Link to={`/personal/${this.state.boss._id}`}>
                <h2>CEO: {this.state.boss.firstName}</h2>
              </Link>
            </div>
            <div className="col-8">
              <h2>Teams</h2>
              <p>
                There are currently {this.state.teams.length} Teams in your
                company
              </p>
              <CompanyTable
                teams={organizedTeamData}
                sortColumn={this.state.sortColumn}
                onSort={this.handleSort}
              />
              <h2>Employees not in team</h2>
              <p>
                There are currently {this.state.members.length} employees in
                your company has not been assigned in a team
              </p>
              <MemberTable
                teams={organizedMemberData}
                sortColumn={this.state.sortColumn2}
                onSort={this.handleSort2}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Company;
