import React, { Component } from "react";
import NavBar from "./common/navBar";
import "./personal.css";
import { Link } from "react-router-dom";
import CompanyTable from "./companyTable";
import MemberTable from "./memberTable";
import _ from "lodash";
import { getTeamByCompanyId } from "../services/teamService";
import { getCompanyById } from "../services/companyService";
import {
  getMemberById,
  getAllMembers,
  getMembersByCompanyId,
  getNotTeamMembersByCompanyId,
} from "./../services/memberService";
import Textarea from "./common/textarea.jsx";
import { ceoPostNotif } from "../services/notificationService";
import { addCompanyMessage } from "./../services/notificationService";


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
    noTeamMembers: [],
    members: [],
    sortColumn: { path: "teamName", order: "asc" },
    sortColumn2: { path: "firstName", order: "asc" },
    notification: "",
  };
  async componentDidMount() {
    const cur_ms = await getAllMembers();
    // console.log("66666666666666666")
    console.log(cur_ms)
    if (cur_ms.status == 200) {
      let members = await cur_ms.json();
      this.setState({ members: members });
      // console.log("88888888888888888")
      // console.log(members)
    }

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
      this.setState({ noTeamMembers: member });
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

  handleSubmit = async (e) => {
    console.log("this.state.notification: ", this.state.notification);
    await addCompanyMessage({
      companyId: this.props.match.params.id,
      message: this.state.notification,
    });
    // this.props.history.push("/personal/" + this.state.data._id);
    window.location.reload();
  };

  getMemberByIdCur = (id) => {
    if (id === "") {
      return null;
    }
    return this.state.members.find((t) => t._id == id);
  }

  getFullNameById = (id) => {
    if (id == "") return ""
    // console.log("###getFullNameById###")
    // console.log(this.state.members)
    let cur_member = this.getMemberByIdCur(id)
    // console.log(id)
    // console.log(cur_member)
    return cur_member.firstName + " " + cur_member.lastName;
  }

  render() {
    // console.log("777777777777777777")
    // console.log(this.state.members)
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
      organizedTeamData[t].leaderName = this.getFullNameById(
        organizedTeamData[t].leader
      );
      organizedTeamData[t].leaderPic = this.getMemberByIdCur(
        organizedTeamData[t].leader
      ).profilePic;
    }

    const organizedMemberData = _.orderBy(
      this.state.noTeamMembers,
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
              {localStorage.companyId == this.props.match.params.id && localStorage.rank == 1 && (
                <div>
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
              )}
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
                There are currently {this.state.noTeamMembers.length} employees in
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
