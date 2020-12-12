import React, { Component } from "react";
import NavBar from "./common/navBar";
import "./personal.css";
import { Link } from "react-router-dom";
import { getTasksByAssignedTo } from "../services/taskService";
import { getMemberById, getAllMembers } from "../services/memberService";
import TaskTable from "./taskTable";
import Textarea from "./common/textarea.jsx";
import _ from "lodash";
import { addPersonalMessage } from "./../services/notificationService";

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
    memberId: null,
    tasks: [],
    members: [],
    sortColumn: { path: "name", order: "asc" },
    notification: "",
  };

  async componentDidMount() {
    const cur_ms = await getAllMembers();
    // console.log("66666666666666666")
    console.log(cur_ms);
    if (cur_ms.status == 200) {
      let members = await cur_ms.json();
      this.setState({ members: members });
      // console.log("88888888888888888")
      // console.log(members)
    }
    let memberId = localStorage.memberId;
    this.setState({ memberId });

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

  handleSubmit = async (e) => {
    console.log("this.state.notification: ", this.state.notification);
    await addPersonalMessage({
      fromId: this.state.memberId,
      toId: this.state.data._id,
      message: this.state.notification,
    });
    // this.props.history.push("/personal/" + this.state.data._id);
    window.location.reload();
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

  getMemberByIdCur = (id) => {
    if (id === "") {
      return null;
    }
    return this.state.members.find((t) => t._id === id);
  };

  getFullNameById = (id) => {
    // console.log("###getFullNameById###")
    // console.log(id)
    // console.log(this.state.members)
    return (
      this.getMemberByIdCur(id).firstName +
      " " +
      this.getMemberByIdCur(id).lastName
    );
  };

  render() {
    const organizedTaskData = _.orderBy(
      this.state.tasks,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    for (let t in organizedTaskData) {
      organizedTaskData[t].assignedBy = this.getFullNameById(
        organizedTaskData[t].assignedById
      );
      organizedTaskData[t].assignedByPic = getMemberById(
        organizedTaskData[t].assignedById
      ).profilePic;
      organizedTaskData[t].assignedTo = this.getFullNameById(
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
                tabIndex="-1"
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
