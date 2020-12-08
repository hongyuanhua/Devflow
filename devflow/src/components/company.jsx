import React, { Component } from "react";
import NavBar from "./common/navBar";
import "./personal.css";
import { getNotificaitons } from "../services/fakeNotificationServices";
import { getTeamsByCompanyId } from "../services/fakeTeamService.js";
import {
  getMemberByCompanyId_NoTeam,
  getFullNameById,
} from "../services/fakeMemberService.js";
import { Link } from "react-router-dom";
import CompanyTable from "./companyTable";
import MemberTable from "./memberTable";
import _ from "lodash";
import { getTeamByCompanyId } from "../services/teamService";
import { getCompanyById } from "../services/companyService";
import {
  getMemberById,
  getMembersByCompanyId,
  getNotTeamMembersByCompanyId,
} from "./../services/memberService";
import Textarea from "./common/textarea.jsx";
import {ceoPostNotif} from "../services/notificationService";

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
    message: "",

    company: {},
    teams: [],
    boss: {},
    members: [],
    sortColumn: { path: "teamName", order: "asc" },
    sortColumn2: { path: "firstName", order: "asc" },
    notification: "",
  };
  async componentDidMount() {
    let companyId = this.props.match.params.id;
    const team = await getTeamByCompanyId(companyId);
    if (team.status == 200) {
      let teams = await team.json();
      this.setState({ teams: teams });
    }
    const company = await getCompanyById(companyId);
    if (company.status == 200) {
      let companies = await company.json();
      if (!companies) return this.props.history.replace("/not-found");
      this.setState({ company: companies });
    }

    const boss = await getMemberById(this.state.company.bossId);
    if (boss.status == 200) {
      let member = await boss.json();
      this.setState({ boss: member });
    }

    const memberk = await getNotTeamMembersByCompanyId(companyId);
    if (memberk.status == 200) {
      let member = await memberk.json();
      this.setState({ members: member });
    }
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSort2 = (sortColumn2) => {
    this.setState({ sortColumn2 });
  };

  handleChange = ({ currentTarget: input }) => {
    this.state.notification = input.value;
    // console.log(this.state.notification);
    // this.setState({ state });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.ceoSendNotify()
  };


  ceoSendNotify = () => {
    ceoPostNotif(localStorage.memberId, this.state.members, this.state.notification)
    .then(e => {
      console.log(e);
    })
  }

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
      organizedMemberData[t].name =
        organizedMemberData[t].firstName +
        " " +
        organizedMemberData[t].lastName;
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
              <Textarea
                name="notification"
                label="Send Notification"
                onChange={this.handleChange}
                rows="4"
              />
              <br></br>
              <a
                className="btn btn-primary btn-lg "
                tabIndex="-1"
                role="button"
                aria-disabled="false"
                onClick={this.handleSubmit}
              >
                Send
              </a>
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
