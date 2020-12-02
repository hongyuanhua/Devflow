import React, { Component } from "react";
import { tasks } from "../services/fakeTaskService";
import NavBar from "./common/navBar";
import "./personal.css";
import { getTasks, deleteTasks } from "../services/fakeTaskService";
import { Link } from "react-router-dom";
import {
  getMembers,
  getMemberById,
  getFullNameById,
  members,
} from "../services/fakeMemberService";
import TaskTable from "./taskTable";
import _ from "lodash";
import { getTaskById, getTaskByMemberId } from "./../services/fakeTaskService";

class Personal extends Component {
  state = {
    data: {
      _id: "",
      firstName: "",
      lastName: "",
      userName: "",
      rank: 3,
      companyId: "",
      teamId: "",
      password: "",
      profilePic: "",
    },
    tasks: [],
    sortColumn: { path: "name", order: "asc" },
  };
  componentDidMount() {
    const personId = this.props.match.params.id;
    const member = getMemberById(personId);
    if (!member) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(member),
      tasks: getTaskByMemberId(personId),
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
  modifyName = (name) => {
    if (name.length > 28) {
      name = name.slice(0, 25) + "...";
    }
    return name;
  };
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
    console.log(organizedTaskData);
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
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="row">
            <div id="personalInfo" className="col-4">
              <h1>
                {this.state.data.firstName + " " + this.state.data.lastName}
              </h1>
              <div className="row">
                {<img className="small" src={this.state.data.profilePic} />}
              </div>
              <div className="row">
                <div className="col">
                  <h3>Team:</h3>
                </div>
                <div className="col">
                  <h3>{this.state.data.teamId}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h3>Rank:</h3>
                </div>
                <div className="col">
                  <h3>{this.state.data.rank}</h3>
                </div>
              </div>
            </div>
            <div className="col-8">
              <h2>Tasks</h2>
              <p>
                There are currently {this.state.tasks.length} tasks assigned to
                you.
              </p>
              <TaskTable
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

export default Personal;
