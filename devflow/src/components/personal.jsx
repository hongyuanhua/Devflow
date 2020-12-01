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

class Personal extends Component {
  state = {
    data: {
      _id: "",
      firstName: "First Name",
      lastName: "Last Name",
      rank: 10000,
      teamId: "placeholder",
      quote: "placeholder",
    },
    tasks: getTasks(),
    sortColumn: { path: "name", order: "asc" },
  };

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
              <div id="quote" className="row">
                <h5>{"'" + this.state.data.quote + "'"}</h5>
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
              {/* <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Create By</th>
                    <th scope="col">Assigned By</th>
                    <th scope="col">Assined TO</th>
                    <th scope="col">Time Estimated</th>
                    <th scope="col">Time Used</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => (
                    <tr>
                      <Link to={`/taskDetail_Present/${task._id}`}>
                        <th className="clickable" scope="col">
                          {this.modifyName(task.name)}
                        </th>
                      </Link>
                      <td>{task.createdById}</td>
                      <td>{task.assignedById}</td>
                      <td>{task.assignedToId}</td>
                      <td>{task.estimatedTime}</td>
                      <td>{task.usedTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Personal;
