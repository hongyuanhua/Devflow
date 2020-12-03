import React, { Component } from "react";
// import logo from './logo.svg';
import NavBar from "./common/navBar";
import Form from "./common/form";
import Joi from "joi-browser";
import {
  getTasks,
  getTaskById,
  deleteTasks,
  saveTask,
} from "../services/fakeTaskService";
import { Link } from "react-router-dom";
import Textarea from "./common/textarea.jsx";
import { getAllMembers } from "../services/memberService";
import { getMemberById } from "./../services/memberService";
import { getTeam } from "../services/teamService";
import { addTask, updateTask } from "./../services/taskService";
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
    },
    members: [],
    teams: [],
    current: {},
    status: "new",
    errors: {},
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
    if (new_members.status == 200) {
      let member = await new_members.json();
      this.setState({ members: member });
    }
    const current = await getMemberById(memberId);
    if (current.status == 200) {
      let member = await current.json();
      if (member.rank > 2) {
        this.props.history.push("/unauthorized");
      }
      this.setState({
        data: {
          _id: "",
          companyId: member.companyId,
          teamId: member.teamId,
          name: "",
          estimatedTime: 0,
          usedTime: 0,
          assignedToId: "",
          assignedById: memberId,
          taskDetail: "",
        },
      });
      this.setState({ current: member });
    }
    const new_teams = await getTeam();
    if (new_teams.status == 200) {
      let team = await new_teams.json();
      console.log(team);
      this.setState({ teams: team });
    }

    const taskId = this.props.match.params.id;
    if (taskId === "new") {
      return;
    }
    console.log(taskId);

    const task = getTaskById(taskId);
    if (!task) return this.props.history.replace("/not-found");
    this.setState({ status: "notNew" });
    this.setState({ data: this.mapToViewModel(task) });
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

  handleNameChange = ({ currentTarget: input }) => {
    const data = this.state.data;
    data.name = input.value;
    this.setState({ data });
  };

  handleDelete = () => {
    deleteTasks(this.state.data._id);
  };
  handleGetInput = (e, name) => {
    const data = this.state.data;
    if (name == "assignedTo") {
      data.assignedToId = document.getElementById("assignedTo").value;
    } else if (name == "teamId") {
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
                        <option value="">Empty</option>
                        {this.state.teams.map((team) => (
                          <option
                            key={team._id}
                            value={team._id}
                            selected={this.state.data.teamId === team._id}
                          >
                            {team._id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {this.state.current.rank != 1 && (
                  <div className="col">
                    <div className="form-group">
                      <label>Assigned to:</label>
                      <select
                        className="form-control"
                        onChange={(e) => this.handleGetInput(e, "assignedTo")}
                        id="assignedTo"
                      >
                        <option value="">Empty</option>
                        {this.state.members.map((member) => (
                          <option
                            key={member._id}
                            value={member._id}
                            selected={
                              this.state.data.assignedToId === member._id
                            }
                          >
                            {member.firstName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSave}
                >
                  Save
                </button>
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
        </div>
      </React.Fragment>
    );
  }
}

export default TaskDetail;
