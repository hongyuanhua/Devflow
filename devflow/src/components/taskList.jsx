import React, { Component, Fragment } from "react";
import { getTasks } from "../services/fakeTaskService";
import { getMemberById, getMembers } from "../services/fakeMemberService";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navBar";
import NavBar from "./navBar";
import { Link } from "react-router-dom";
class taskList extends Component {
  state = {
    tasks: getTasks(),
    show: false,
    members: getMembers(),
  };

  handleJoin = (task, id) => {
    var tasks = this.state.tasks.filter((m) => m._id !== task._id);
    const newTask = {
      _id: task._id,
      groupId: task.groupId,
      companyId: task.companyId,
      name: task.name,
      estimatedTime: task.estimatedTime,
      usedTime: task.usedTime,
      assignedToId: id,
      assignedById: task.assignedById,
      createdById: task.createdById,
      taskDetail: task.taskDetail,
    };
    tasks.push(newTask);
    this.setState({ tasks });
  };

  getMemberFirstName = (id) => {
    if (getMemberById(id) == null) {
      return "";
    } else {
      return getMemberById(id).firstName;
    }
  };

  getCurrentGID = (id) => {
    var input, i;
    input = this.state.tasks;
    for (i = 0; i < input.length; i++) {
      if (input[i].createdById == id) {
        return this.getMemberFirstName(input[i].createdById);
      } else if (input[i].assignedToId == id) {
        return this.getMemberFirstName(input[i].assignedToId);
      } else if (input[i].assignedById == id) {
        return this.getMemberFirstName(input[i].assignedById);
      }
    }
    return "None";
  };
  getAssignedTask = (id) => {
    var input, i, c;
    c = 0;
    input = this.state.tasks;
    for (i = 0; i < input.length; i++) {
      if (input[i].assignedToId == id) {
        c += 1;
      }
    }
    return c;
  };

  onKeyUpValue = (input) => {
    var filter, item, a, i, txtValue;
    filter = input.value.toUpperCase();
    item = document.getElementsByClassName("col-sm-4");
    for (i = 0; i < item.length; i++) {
      a = item[i];
      txtValue = a.children[0].textContent + a.children[1].textContent;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        item[i].style.display = "";
      } else {
        item[i].style.display = "none";
      }
    }
  };

  modifyName = (name) => {
    if (name.length > 18) {
      name = name.slice(0, 15) + "..."
    }
    return name
  }

  newTask(name, created, assigned, eTime) {
    const k = {
      _id: this.state.tasks.length + 1,
      name: name,
      estimatedTime: eTime,
      usedTime: 0,
      assignedToId: assigned,
      assignedById: created,
      createdById: created,
      taskDetail: "",
    };
    var b = this.state.tasks;
    b.push(k);
    this.setState({ b });
  }

  sortCategory = (path) => {
    const taskss = this.state.tasks.sort(function (a, b) {
      if (path == "usedTime") {
        return a.usedTime - b.usedTime;
      } else if (path == "name") {
        return ("" + a.name).localeCompare(b.name);
      } else if (path == "id") {
        return ("" + a.assignedToId).localeCompare(b.assignedToId);
      } else if (path == "Group ID") {
        return ("" + a.groupId).localeCompare(b.groupId);
      } else if (path == "Estimated Time") {
        return a.estimatedTime - b.estimatedTime;
      }
    });
    const task = taskss.reverse();
    this.setState({ task });
  };
  print = (event, hi) => {
    var k;
    var filter, item, a, i, txtValue;
    item = document.getElementsByClassName("col-sm-4");
    for (i = 0; i < item.length; i++) {
      a = item[i];

      if (hi == "assigned_by") {
        k = a.childNodes[3].textContent.replace("Assigned By: ", "");
      } else if (hi == "assigned_to") {
        k = a.childNodes[4].textContent.replace("Assigned To: ", "");
      } else if (hi == "created_by") {
        k = a.childNodes[2].textContent.replace("Created By: ", "");
      }

      if (k == this.getMemberFirstName(event.target.value)) {
        item[i].style.display = "";
      } else {
        item[i].style.display = "none";
      }
    }
  };
  resetOptions() {
    var item = document.getElementsByClassName("filters");
    var appear = document.getElementsByClassName("col-sm-4");
    for (var i = 0; i < item.length; i++) {
      item[i].selectedIndex = 0;
    }
    for (var i = 0; i < appear.length; i++) {
      appear[i].style.display = "";
    }
  }
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <div className="container">
          <div className="row"></div>
          <input
            className="form-control mg-2"
            id="myInput"
            type="text"
            onKeyUp={() =>
              this.onKeyUpValue(document.getElementById("myInput"))
            }
            placeholder="Search Group ID or Task Title.."
          ></input>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Assigned By:</label>
                <select
                  className="form-control filters"
                  onChange={(e) => this.print(e, "assigned_by")}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT">Any</option>
                  <option value="">Empty</option>
                  {this.state.members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Assigned to:</label>
                <select
                  className="form-control filters"
                  onChange={(e) => this.print(e, "assigned_to")}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT">Any</option>
                  <option value="">Empty</option>
                  {this.state.members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Created by:</label>
                <select
                  className="form-control filters"
                  onChange={(e) => this.print(e, "created_by")}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT">Any</option>
                  <option value="">Empty</option>
                  {this.state.members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={this.resetOptions}
              className="btn btn-outline-success"
            >
              reset
            </button>
          </div>

          <span>Sort by(DEC order): </span>
          <button
            type="button"
            onClick={() => this.sortCategory("name")}
            className="btn btn-outline-secondary"
          >
            Names
          </button>
          <button
            type="button"
            onClick={() => this.sortCategory("usedTime")}
            className="btn btn-outline-secondary"
          >
            Used Time
          </button>
          <button
            type="button"
            onClick={() => this.sortCategory("id")}
            className="btn btn-outline-secondary"
          >
            ID
          </button>

          <button
            type="button"
            onClick={() => this.sortCategory("Group ID")}
            className="btn btn-outline-secondary"
          >
            Group ID
          </button>
          <button
            type="button"
            onClick={() => this.sortCategory("Estimated Time")}
            className="btn btn-outline-secondary"
          >
            Estimated Time
          </button>
          <Link to="/taskDetail/new">
            <button className="float-right btn btn-outline-primary">
              Add new task
            </button>
          </Link>

          <div className="row justify-content-center">
            {this.state.tasks.map((task) => (
              <div
                key={task._id}
                className="col-sm-4 border rounded btn-outline-dark"
              >
                <Link to={`/taskDetail_Present/${task._id}`}>
                  <button className="btn btn-outline-secondary">
                    <h3 className="title">{this.modifyName(task.name)}</h3>
                  </button>
                </Link>
                <p className="mt-4">
                  <span className="font-weight-bold">Group: </span>
                  {task.groupId}
                </p>
                <p className="mt-4">
                  <span className="font-weight-bold">Created By: </span>
                  {task.createdById != "" && (
                    <img
                      src={
                        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      }
                      style={{ borderRadius: "50%", width: "20px" }}
                    />
                  )}
                  <span style={{ marginLeft: "5px" }}>
                    {this.getMemberFirstName(task.createdById)}
                  </span>
                </p>
                <p className="mt-4">
                  <span className="font-weight-bold">Assigned By: </span>
                  {task.assignedById != "" && (
                    <img
                      src={
                        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      }
                      style={{ borderRadius: "50%", width: "20px" }}
                    />
                  )}
                  <span style={{ marginLeft: "5px" }}>
                    {this.getMemberFirstName(task.assignedById)}
                  </span>
                </p>
                <p className="mt-4">
                  <span className="font-weight-bold">Assigned To: </span>
                  {task.assignedToId != "" && (
                    <img
                      src={
                        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      }
                      style={{ borderRadius: "50%", width: "20px" }}
                    />
                  )}
                  <span style={{ marginLeft: "5px" }}>
                    {this.getMemberFirstName(task.assignedToId)}
                  </span>
                </p>
                <p className="font-weight-light">
                  Time spent: {task.usedTime} hrs
                </p>
                <p className="font-weight-light">
                  Estimated Time: {task.estimatedTime} hrs
                </p>
                <div className="text-center">
                  <button
                    onClick={() => this.handleJoin(task, "1")}
                    className="btn btn-danger text-center"
                    disabled={!(task.assignedToId == "")}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default taskList;
