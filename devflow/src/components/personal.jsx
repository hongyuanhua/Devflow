import React, { Component } from "react";
import { tasks } from "../services/fakeTaskService";
import NavBar from "./common/navBar";
import "./personal.css";
import { getTasks, deleteTasks } from "../services/fakeTaskService";
import { Link } from "react-router-dom";
import { getTasksByAssignedTo } from "../services/taskService";
import { getMemberById } from "../services/memberService";
import {
  getMembers,
  getFullNameById,
  members,
} from "../services/fakeMemberService";
import TaskTable from "./taskTable";
import Textarea from "./common/textarea.jsx";
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
    notification: "",
  };

  async componentDidMount() {
    let userId = this.props.match.params.id;
    let member = await getMemberById(userId);
    console.log(userId);
    if (member.status == 200) {
      let members = await member.json();
      this.setState({
        data: this.mapToViewModel(members),
      });
      let task = await getTasksByAssignedTo(userId);
      if (task.status == 200) {
        let tasks = await task.json();
        console.log(tasks);
        this.setState({
          tasks: tasks,
        });
      }
    }
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

  handleChange = ({ currentTarget: input }) => {
    this.state.notification = input.value;
    // console.log(this.state.notification);
    // this.setState({ state });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.notification);
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
              <div className="row">
                {
                  <img
                    className="small right"
                    src={this.state.data.profilePic}
                  />
                }
              </div>
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
              <Textarea
                name="notification"
                label="Send Notification"
                onChange={this.handleChange}
                rows="4"
              />
              <br></br>
              <a
                className="btn btn-primary btn-lg "
                tabindex="-1"
                role="button"
                aria-disabled="false"
                onClick={this.handleSubmit}
              >
                Send
              </a>
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
