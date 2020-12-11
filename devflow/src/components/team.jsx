import React, { Component } from "react";
import NavBar from "./common/navBar";
import "./team.css";
import { getCompanyNameById } from "../services/fakeCompanyServices";

import { deleteTasks } from "../services/fakeTaskService";
import { getTasksByTeam } from "../services/taskService";
import { getAllMembers, getMembersByTeamId } from "../services/memberService";
import { Link } from "react-router-dom";
import { isCompositeComponent } from "react-dom/test-utils";
import _ from "lodash";
import { getTeamById } from "../services/teamService";
import TeamTable from "./teamTable";
import Textarea from "./common/textarea.jsx";
import { addTeamMessage } from "./../services/notificationService";

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
    members: [],
    teamMembers: [],
    sortColumn: { path: "name", order: "asc" },
    notification: "",
    teamId: "",
  };
  modifyName = (name) => {
    if (name.length > 28) {
      name = name.slice(0, 25) + "...";
    }
    return name;
  };
  async componentDidMount() {
    const teamId = this.props.match.params.id;

    const cur_ms = await getAllMembers();
    // // ("66666666666666666")
    // (cur_ms)
    if (cur_ms.status == 200) {
      let members = await cur_ms.json();
      this.setState({ members: members });
      // // ("88888888888888888")
      // // (members)
    }

    const n = await getMembersByTeamId(teamId);
    if (n.status == 200) {
      let k = await n.json();
      this.setState({ teamMembers: k });
    }

    const memberId = localStorage.memberId;
    const task = await getTasksByTeam(teamId, memberId);
    // ("###getTasksByTeam###")
    if (task.status == 200) {
      let tasks = await task.json();
      // (tasks);
      this.setState({ tasks: tasks });
    }
    this.setState({ teamId });
    const team = await getTeamById(teamId);
    let teams;
    if (team.status == 200) {
      teams = await team.json();
      if (!teams) return this.props.history.replace("/not-found");
      this.setState({ data: teams });
    }

    if (localStorage.rank != 0 && localStorage.companyId != teams.companyId) {
      this.props.history.push("/unauthorized");
    }
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
    // (this.state.tasks);
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });

    deleteTasks(task._id);
  };

  handleChange = ({ currentTarget: input }) => {
    this.state.notification = input.value;
    // // (this.state.notification);
    // this.setState({ state });
  };

  handleSubmit = async (e) => {
    // ("this.state.notification: ", this.state.notification);
    await addTeamMessage({
      teamId: this.props.match.params.id,
      message: this.state.notification,
    });
    // this.props.history.push("/personal/" + this.state.data._id);
    window.location.reload();
  };

  getMemberByIdCur = (id) => {
    if (id === "") {
      return null;
    }
    let cur_member = this.state.members.find((t) => t._id == id);
    // ("###getMemberByIdCur###")
    // (id)
    // (cur_member)
    return cur_member;
  }

  getFullNameById = (id) => {
    // ("###getFullNameById###")
    // (this.state.members)
    let cur_member = this.getMemberByIdCur(id)
    // (id)
    // (cur_member)
    return cur_member.firstName + " " + cur_member.lastName;
  }

  render() {
    const organizedTaskData = _.orderBy(
      this.state.tasks,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    // ("organizedTaskData");
    // (organizedTaskData);
    for (let t in organizedTaskData) {
      // ("organizedTaskData[t]")
      // (organizedTaskData[t])
      // (organizedTaskData)
      if (organizedTaskData[t].assignedById != "") {
        organizedTaskData[t].assignedBy = this.getFullNameById(
          organizedTaskData[t].assignedById
        );
        organizedTaskData[t].assignedByPic = this.getMemberByIdCur(
          organizedTaskData[t].assignedById
        ).profilePic;
      }
      if (organizedTaskData[t].assignedToId != "") {
        organizedTaskData[t].assignedTo = this.getFullNameById(
          organizedTaskData[t].assignedToId
        );
        organizedTaskData[t].assignedToPic = this.getMemberByIdCur(
          organizedTaskData[t].assignedToId
        ).profilePic;
      }
    }
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
                  {this.state.teamMembers.map((member) => (
                    <p className="mt-4">
                      <Link to={`/personal/${member}`}>
                        <div className="click">
                          <img
                            src={member.profilePic}
                            style={{ borderRadius: "50%", width: "20px" }}
                          />
                          <span style={{ marginLeft: "5px" }}>
                            {member != null &&
                              member.firstName}
                          </span>
                        </div>
                      </Link>
                    </p>
                  ))}
                </div>
                {localStorage.teamId == this.state.teamId && localStorage.rank == 2 && (
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
