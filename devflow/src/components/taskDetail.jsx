import React, { Component } from "react";
// import logo from './logo.svg';
import NavBar from "./common/navBar";
import Form from "./common/form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Textarea from "./common/textarea.jsx";
import { getAllMembers } from "../services/memberService";
import { getMemberById } from "./../services/memberService";
import {
  getTeam,
  getTeamByCompanyId,
  getTeamById,
} from "../services/teamService";
import { deleteTask } from "../services/adminService";
import {
  addTask,
  updateTask,
  getTaskById,
  getTasksById,
} from "./../services/taskService";
import { getAllTask } from "./../services/adminService";
class TaskDetail extends Form {
  state = {
    data: {
      _id: "",
      companyId: "",
      teamId: "",
      name: "",
      estimatedTime: 0,
      usedTime: 0,
      assignedToId: "",
      assignedById: "",
      taskDetail: "",
      isFinish: "",
    },
    members: [],
    teams: [],
    current: {},
    status: "new",
    errors: {},
    selected: "",
  };

  schema = {
    name: Joi.string().required(),
    estimatedTime: Joi.number(),
    usedTime: Joi.number(),
    taskDetail: Joi.string().required(),
  };

  async componentDidMount() {
    const memberId = localStorage.memberId;

    const new_members = await getAllMembers();
    const currentUserR = await getMemberById(memberId);
    const currentUser = await currentUserR.json();
    const new_teams = await getTeamByCompanyId(currentUser.companyId);
    console.log(this.state.data);
    this.setState({
      members: await new_members.json(),
      current: currentUser,
      selected: currentUser.teamId,
      teams: await new_teams.json(),
      data: {
        _id: "",
        companyId: currentUser.companyId,
        teamId: currentUser.teamId != "" && currentUser.teamId,
        name: "",
        estimatedTime: 0,
        usedTime: 0,
        assignedToId: "",
        assignedById: memberId,
        taskDetail: "",
        isFinish: "false",
      },
    });
    if (this.state.current.rank > 2) {
      this.props.history.push("/unauthorized");
    }

    const taskId = this.props.match.params.id;
    if (taskId === "new") {
      return;
    }

    const tasks = await getTasksById(taskId);

    this.setState({
      data: this.mapToViewModel(await tasks.json()),
      status: "notNew",
    });
    if (!this.state.data) return this.props.history.replace("/not-found");
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      teamId: task.teamId,
      companyId: task.companyId,
      name: task.name,
      estimatedTime: task.estimatedTime,
      usedTime: task.usedTime,
      assignedToId: task.assignedToId,
      assignedById: task.assignedById,
      taskDetail: task.taskDetail,
    };
  }
  getMemberByTeamId(teamId) {
    return this.state.members.filter((t) => t.teamId == teamId);
  }
  handleNameChange = ({ currentTarget: input }) => {
    const data = this.state.data;
    data.name = input.value;
    this.setState({ data });
  };

  handleDelete = () => {
    deleteTask(this.state.data._id);
  };
  handleGetInput = (e, name) => {
    const data = this.state.data;
    if (name == "assignedTo") {
      data.assignedToId = document.getElementById("assignedTo").value;
    } else if (name == "teamId") {
      this.setState({ selected: document.getElementById("teamId").value });
      data.teamId = document.getElementById("teamId").value;
    }
    this.setState({ data });
  };
  handleSave = async () => {
    if (this.state.status == "new") {
      await addTask(this.state.data);
    } else {
      await updateTask(this.state.data);
    }
  };
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <form>{this.renderInput("name", "Task Name:", "text")}</form>
          <div className="row">
            <div className="col">
              <div className="row">
                {console.log("1")}
                {console.log(this.state.current)}
                {this.state.current.rank < 2 && (
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">TeamId:</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => this.handleGetInput(e, "teamId")}
                        id="teamId"
                      >
                        <option
                          value=""
                          selected={this.state.data.teamId === ""}
                        >
                          Empty
                        </option>
                        {this.state.teams.map((team) => (
                          <option
                            key={team._id}
                            value={team._id}
                            selected={this.state.data.teamId === team._id}
                          >
                            {team.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="col">
                  <div className="form-group">
                    <label>Assigned to:</label>
                    <select
                      className="form-control"
                      onChange={(e) => this.handleGetInput(e, "assignedTo")}
                      id="assignedTo"
                    >
                      <option
                        value=""
                        defaultValue={this.state.data.assignedToId === ""}
                      >
                        Empty
                      </option>

                      {this.state.selected != "" &&
                        this.getMemberByTeamId(this.state.selected).map(
                          (member) => (
                            <option
                              key={member._id}
                              value={member._id}
                              selected={
                                this.state.data.assignedToId === member._id
                              }
                            >
                              {member.firstName}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <label for="exampleFormControlTextarea1">
                  Task Description:
                </label>
              </div> */}

              {/* <div className="row">
                <label for="exampleFormControlTextarea1">
                  Task Description:
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="20"
                  value={this.state.data.taskDetail}
                ></textarea>
              </div> */}
              {/* {this.renderTextarea("taskDetail", "Task Description:", "20")} */}
              <Textarea
                name="taskDetail"
                label="Task Description:"
                value={this.state.data["taskDetail"]}
                onChange={this.handleChange}
                error={this.state.errors["taskDetail"]}
                rows="20"
              />
            </div>

            <div className="col-1"></div>

            <div className="col-3">
              <div className="row"></div>
              <div className="row">
                <form>
                  {this.renderInput("estimatedTime", "Estimated Time:", "text")}
                </form>
              </div>
              <div className="row"></div>
              <div className="row">
                <form>
                  {this.renderInput("usedTime", "Used Time:", "text")}
                </form>
              </div>
              <br></br>
              <div className="row">
                <Link to="/taskList">
                  <button type="button" className="btn btn-primary">
                    Back
                  </button>
                </Link>
              </div>
              <br></br>
              <div className="row">
                <Link to="/taskList">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSave}
                  >
                    Save
                  </button>
                </Link>
              </div>
              <br></br>
              <div className="row">
                <Link to="/taskList">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {console.log(this.state)}
        </div>
      </React.Fragment>
    );
  }
}

export default TaskDetail;
