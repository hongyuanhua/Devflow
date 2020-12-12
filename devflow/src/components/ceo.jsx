import React, { Component } from "react";
import NavBar from "./common/navBar";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getCompanyById } from "../services/companyService";
import { getTasksByCompanyId } from "../services/taskService";
import { deleteTask, deleteMember, deleteTeam } from "../services/adminService";
import { getTeamByCompanyId } from "../services/teamService";
import TeamTable from "../components/adminTeamTable";
import MemberTable from "../components/adminMemberTable";
import TaskTable from "../components/adminTasksTable";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getMembersByCompanyId2,
  getMembersByCompanyId,
} from "../services/memberService";
class ceo extends Component {
  state = {
    company: {},
    tasks: [],
    teams: [],
    members: [],
    message: "",
    types: [
      { name: "Teams", selected: "true" },
      { name: "Members", selected: "false" },
      { name: "Tasks", selected: "false" },
    ],
    sortColumn: { path: "_id", order: "asc" },
  };

  async componentDidMount() {
    const rank = localStorage.rank;
    const curCompanyId = localStorage.companyId;
    const companyId = this.props.match.params.id;
    console.log("1");
    if (rank != 1 || curCompanyId != companyId) {
      this.props.history.push("/unauthorized");
    }
    const task = await getTasksByCompanyId(companyId);
    this.setState({ tasks: await task.json() });
    console.log(this.state.tasks);
    const members = await getMembersByCompanyId(curCompanyId);
    // const tasks = getMembersByCompanyId2(companyId)
    //   .then((result) => result.json())
    //   .then((data) => {
    //     this.setState({
    //       members: data.members,
    //     });
    //   });
    const companyP = await getCompanyById(companyId);
    const teamP = await getTeamByCompanyId(companyId);
    const company = await companyP.json();
    const team = await teamP.json();
    const member = await members.json();
    console.log(company);
    if (!company) return this.props.history.replace("/not-found");
    this.setState({
      company: company,
      teams: team,
      members: member,
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
    if (value.name == "Teams") {
      return this.state.teams;
    } else if (value.name == "Members") {
      return this.state.members;
    } else if (value.name == "Tasks") {
      return this.state.tasks;
    }
  }
  async TeamHandleDelete(team) {
    deleteTeam(team._id);
  }
  async TaskHandleDelete(task) {
    deleteTask(task._id);
    window.location.reload();
  }
  MemberHandleDelete = (member) => {
    deleteMember(member._id);
    window.location.reload();
  };

  render() {
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
        <div className="row mx-5">
          <div className="col-3">
            <ul className="list-group">
              {this.state.types.map((type) => {
                return (
                  <li
                    className={
                      type.selected === "true"
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                    key={type.name}
                    onClick={() => this.selected(type.name)}
                  >
                    {type.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col">
            <div className="row mb-3">
              <div className="col">
                {this.state.types[0].selected == "true" && (
                  <Link to={`/mt/new`}>
                    <button className="btn btn-primary btn-large float-left">
                      Add Team
                    </button>
                  </Link>
                )}
                {this.state.types[1].selected == "true" && (
                  <Link to={"/mm/new"}>
                    <button className="btn btn-primary btn-large float-left">
                      Add Member
                    </button>
                  </Link>
                )}
                {this.state.types[2].selected == "true" && (
                  <button className="btn btn-primary btn-large float-left">
                    Add Tasks
                  </button>
                )}
              </div>
            </div>
            {this.state.types[0].selected == "true" && (
              <TeamTable
                teams={organizedTeamData}
                sortColumn={this.state.sortColumn}
                onDelete={this.TeamHandleDelete}
                onSort={this.handleSort}
              />
            )}
            {this.state.types[1].selected == "true" && (
              <MemberTable
                members={organizedMemberData}
                sortColumn={this.state.sortColumn}
                onDelete={this.MemberHandleDelete}
                onSort={this.handleSort}
              />
            )}
            {this.state.types[2].selected == "true" && (
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
          <div className="col-3">
            <div className="row right">
              <img src={this.state.company.companyPic} />
              <h3>Welcome to {this.state.company.name} CEO page</h3>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ceo;
