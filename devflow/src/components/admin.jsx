import React, { Component } from "react";
import NavBar from "./common/navBar";
import { Link } from "react-router-dom";
import { isCompositeComponent } from "react-dom/test-utils";
import _ from "lodash";
// import { deleteCompany, getCompanies } from "../services/fakeCompanyServices";
import {
  getAllCompany,
  deleteCompany,
  getAllTeam,
  deleteTeam,
  getAllMember,
  deleteMember,
  getAllTask,
  getAllTaskcheckSession,
} from "../services/adminService";
// import { deleteMember, getMembers } from "../services/fakeMemberService";
// import { getNotificaitons } from "../services/fakeNotificationServices";
// import { deleteTasks, getTasks } from "../services/fakeTaskService";
// import { deleteTeam, getTeams } from "../services/fakeTeamService";
import { companies } from "../services/fakeCompanyServices";
import CompaniesTable from "../components/adminCompanyTable";
import TeamTable from "../components/adminTeamTable";
import MemberTable from "../components/adminMemberTable";
import TaskTable from "../components/adminTasksTable";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NotificationsTable from "../components/adminNotificationTable";
class admin extends Component {
  state = {
    companies: [],
    tasks: [],
    teams: [],
    members: [],
    // notifications: getNotificaitons(),
    types: [
      { name: "Companies", selected: "true" },
      { name: "Teams", selected: "false" },
      { name: "Members", selected: "false" },
      { name: "Tasks", selected: "false" },
    ],
    sortColumn: { path: "_id", order: "asc" },
  };

  async componentDidMount() {
    console.log("All company");
    const company = await getAllCompany();
    const task = await getAllTask();
    const team = await getAllTeam();
    const member = await getAllMember();
    this.setState({
      companies: await company.json(),
      tasks: await task.json(),
      teams: await team.json(),
      members: await member.json(),
    });
  }
  selected = (name) => {
    var k = this.state.types;
    var h = k.findIndex((t) => t.selected == "true");
    k[h].selected = "false";
    var a = k.findIndex((t) => t.name == name);
    k[a].selected = "true";
    this.setState({ types: k });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getSelected() {
    var value = this.state.types.find((t) => t.selected == "true");
    if (value.name == "Companies") {
      return this.state.companies;
    } else if (value.name == "Teams") {
      return this.state.teams;
    } else if (value.name == "Members") {
      return this.state.members;
    } else if (value.name == "Tasks") {
      return this.state.tasks;
    }
  }
  CompanyHandleDelete = (company) => {
    const notCompany = this.state.companies.filter(
      (t) => t._id !== company._id
    );
    this.setState({ companies: notCompany });
    console.log(company._id);
    deleteCompany(company._id);
  };
  TeamHandleDelete = (team) => {
    const notTeam = this.state.teams.filter((t) => t._id !== team._id);
    this.setState({ teams: notTeam });
    deleteTeam(team._id);
  };
  TaskHandleDelete = (task) => {
    const notTask = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks: notTask });
    // deleteTasks(task._id);
  };
  MemberHandleDelete = (member) => {
    const notMember = this.state.members.filter((t) => t._id !== member._id);
    this.setState({ members: notMember });
    deleteMember(member._id);
  };
  render() {
    const organizedCompaniesData = _.orderBy(
      this.state.companies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const organizedTeamData = _.orderBy(
      this.state.teams,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const organizedMemberData = _.orderBy(
      this.state.members,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const organizedTaskData = _.orderBy(
      this.state.tasks,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          <div className="col-3">
            <ul className="list-group">
              {this.state.types.map((type) => (
                <li
                  className={
                    type.selected === "true"
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  onClick={() => this.selected(type.name)}
                >
                  {type.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                {this.state.types[0].selected == "true" && (
                  <Link to={`/mc/new`}>
                    <button
                      className="btn btn-primary btn-large float-left"
                      onClick={"./mc/new"}
                    >
                      Add Company
                    </button>
                  </Link>
                )}
                {this.state.types[1].selected == "true" && (
                  <Link to={`/mt/new`}>
                    <button
                      className="btn btn-primary btn-large float-left"
                      onClick={"./mt/new"}
                    >
                      Add Team
                    </button>
                  </Link>
                )}
                {this.state.types[2].selected == "true" && (
                  <Link to={`/mm/new`}>
                    <button className="btn btn-primary btn-large float-left">
                      Add Member
                    </button>
                  </Link>
                )}
                {this.state.types[3].selected == "true" && (
                  <button className="btn btn-primary btn-large float-left">
                    Add Tasks
                  </button>
                )}
              </div>
            </div>
            {this.state.types[0].selected == "true" && (
              <CompaniesTable
                tasks={organizedCompaniesData}
                sortColumn={this.state.sortColumn}
                onDelete={this.CompanyHandleDelete}
                onSort={this.handleSort}
              />
            )}
            {this.state.types[1].selected == "true" && (
              <TeamTable
                teams={organizedTeamData}
                sortColumn={this.state.sortColumn}
                onDelete={this.TeamHandleDelete}
                onSort={this.handleSort}
              />
            )}
            {this.state.types[2].selected == "true" && (
              <MemberTable
                members={organizedMemberData}
                sortColumn={this.state.sortColumn}
                onDelete={this.MemberHandleDelete}
                onSort={this.handleSort}
              />
            )}
            {this.state.types[3].selected == "true" && (
              <TaskTable
                tasks={organizedTaskData}
                sortColumn={this.state.sortColumn}
                onDelete={this.TaskHandleDelete}
                onSort={this.handleSort}
              />
            )}
            {/*<table className="table">
              <thead>
                <tr>
                  {Object.keys(this.getSelected()[0]).map((key) => (
                    <th scope="col">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody></tbody>
            </table>{" "}
                */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default admin;
