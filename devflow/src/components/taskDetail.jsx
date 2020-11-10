import React, { Component } from "react";
// import logo from './logo.svg';
import NavBar from "./navBar";
import Form from "./form";
import Joi from "joi-browser";
import {
  getTasks,
  getTaskById,
  deleteTasks,
  saveTask,
} from "../services/fakeTaskService";
import { getMembers, getMemberById } from "../services/fakeMemberService";
import { Link } from "react-router-dom";
import Textarea from "./textarea.jsx";

class TaskDetail extends Form {
  state = {
    data: {
      _id: "",
      companyId: "",
      name: "",
      estimatedTime: 0,
      usedTime: 0,
      assignedToId: "",
      assignedById: "",
      createdById: "",
      taskDetail: "",
    },
    members: [],
    errors: {},
  };

  schema = {
    name: Joi.string().required(),
    estimatedTime: Joi.number(),
    usedTime: Joi.number(),
    taskDetail: Joi.string().required(),
  };

  componentDidMount() {
    const new_members = getMembers();
    // console.log(new_members)
    this.setState({ members: new_members });
    // console.log(this.state.members)

    const taskId = this.props.match.params.id;
    if (taskId === "new") return;
    console.log(taskId);

    const task = getTaskById(taskId);
    if (!task) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(task) });
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      companyId: task.companyId,
      name: task.name,
      estimatedTime: task.estimatedTime,
      usedTime: task.usedTime,
      assignedToId: task.assignedToId,
      assignedById: task.assignedById,
      createdById: task.createdById,
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

  handleSave = () => {
    saveTask(this.state.data);
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
                <div className="col">
                  <div className="form-group">
                    <label>Assigned to:</label>
                    <select className="form-control">
                      {this.state.members.map((member) => (
                        <option
                          key={member._id}
                          value={member._id}
                          selected={this.state.data.assignedToId == member._id}
                        >
                          {member.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label for="exampleFormControlSelect1">Assigned by:</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      {this.state.members.map((member) => (
                        <option
                          key={member._id}
                          value={member._id}
                          selected={this.state.data.assignedById == member._id}
                        >
                          {member.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label for="exampleFormControlSelect1">Created by:</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      {this.state.members.map((member) => (
                        <option
                          key={member._id}
                          value={member._id}
                          selected={this.state.data.createdById == member._id}
                        >
                          {member.firstName}
                        </option>
                      ))}
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
        </div>
      </React.Fragment>
    );
  }
}

export default TaskDetail;