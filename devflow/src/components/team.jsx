import React, { Component } from "react";
import NavBar from "./common/navBar";
import "./team.css";
import {
  getMembers,
  getMemberById,
  getFullNameById,
  members,
} from "../services/fakeMemberService";

import { getCompanyNameById } from "../services/fakeCompanyServices";

import {
  getTasks,
  getTaskByTeamId,
  tasks,
  deleteTasks,
} from "../services/fakeTaskService";
import { getTeams, getTeamById } from "../services/fakeTeamService";
import { Link } from "react-router-dom";
import { isCompositeComponent } from "react-dom/test-utils";
import _ from "lodash";
import TeamTable from "./teamTable";
class team extends Component {
  state = {
    data: {
      _id: "",
      leaderid: "",
      teamName: "",
      members: [],
      quote: "",
      teamPic: "",
      companyId: "",
    },
    tasks: [],
    sortColumn: { path: "name", order: "asc" },
  };
  modifyName = (name) => {
    if (name.length > 28) {
      name = name.slice(0, 25) + "...";
    }
    return name;
  };
  componentDidMount() {
    const teamId = this.props.match.params.id;
    const team = getTeamById(teamId);
    if (!team) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(team),
      tasks: getTaskByTeamId(teamId),
    });
  }
  mapToViewModel(team) {
    return {
      _id: team._id,
      leaderid: team.leaderid,
      teamName: team.teamName,
      members: team.members,
      quote: team.quote,
      teamPic: team.teamPic,
      companyId: team.companyId,
    };
  }
  sortstuff() {
    console.log(this.state.tasks);
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });

    deleteTasks(task._id);
  };
  render() {
    const organizedTaskData = _.orderBy(
      this.state.tasks,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    for (let t in organizedTaskData) {
      organizedTaskData[t].assignedBy = getFullNameById(
        organizedTaskData[t].assignedById
      );
      organizedTaskData[t].assignedByPic = getMemberById(
        organizedTaskData[t].assignedById
      ).profilePic;
      organizedTaskData[t].assignedTo = getFullNameById(
        organizedTaskData[t].assignedToId
      );
      organizedTaskData[t].assignedToPic = getMemberById(
        organizedTaskData[t].assignedToId
      ).profilePic;
    }
    // console.log(organizedTaskData);
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="row">
            <div id="personalInfo" className="col-sm-4">
              <div className="row">
                <div className="col">
                  <img src={this.state.data.teamPic} className="photo"></img>
                </div>
                <div className="col">
                  <h1>{this.state.data.teamName}</h1>
                </div>
                <div className="col">
                  <h3>{this.state.data.teamId}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h5>{"'" + this.state.data.quote + "'"}</h5>
                </div>

                <div className="col">
                  <Link to={`/company/${this.state.data.companyId}`}>
                    <h3>{getCompanyNameById(this.state.data.companyId)}</h3>
                  </Link>
                </div>
              </div>

              <div className="row">
                <h5>Members:</h5>
                <div className="col">
                  {this.state.data.members.map((member) => (
                    <p className="mt-4">
                      <Link to={`/personal/${member}`}>
                        <div className="click">
                          <img
                            src={getMemberById(member).profilePic}
                            style={{ borderRadius: "50%", width: "20px" }}
                          />
                          {console.log(getMemberById(member))}
                          <span style={{ marginLeft: "5px" }}>
                            {getMemberById(member) != null &&
                              getMemberById(member).firstName}
                          </span>
                        </div>
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-8 form-group">
              <h2>Team Tasks</h2>
              <p>There are currently {this.state.tasks.length} team tasks.</p>
              <TeamTable
                tasks={organizedTaskData}
                sortColumn={this.state.sortColumn}
                onSort={this.handleSort}
                onDelete={this.handleDelete}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default team;
