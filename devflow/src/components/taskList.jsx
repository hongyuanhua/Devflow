import React, { Component, Fragment } from "react";
import { getTasksByTeam } from "../services/taskService";
import { checkSession } from "../services/authService";
import { getAllMembers, getMemberById } from "../services/memberService";
import { getMemberProfilePic } from "../services/memberServiceHelper";
import { getMembers } from "../services/fakeMemberService";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./common/navBar";
import { Link } from "react-router-dom";
class taskList extends Component {
  // async componentWillMount() {
  //   checkSession(this); // sees if a user is logged in.
  // }

  state = {
    currentUser: {},
    tasks: [],
    members: getMembers(),
  };

  async componentDidMount() {
    const memberId = localStorage.memberId;
    console.log(memberId);
    const boss = await getMemberById(memberId);
    console.log(boss.status);
    if (boss.status == 200) {
      let member = await boss.json();
      console.log(member);
      const task = await getTasksByTeam(member.teamId, memberId);
      if (task.status == 200) {
        let tasks = await task.json();
        this.setState({ tasks: tasks });
      }
    }
    const koo = await getAllMembers();
    if (koo.status == 200) {
      let member = await koo.json();
      this.setState({ members: member });
    }
    const currentUser = await getMemberById(memberId);
    if (currentUser.status == 200) {
      let member = await currentUser.json();
      this.setState({ currentUser: member });
    }
  }

  handleJoin = (task, id) => {
    var tasks = this.state.tasks.filter((m) => m._id !== task._id);
    const newTask = {
      _id: task._id,
      teamId: task.teamId,
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

  getCurrentGID = (id) => {
    var input, i;
    input = this.state.tasks;
    for (i = 0; i < input.length; i++) {
      if (input[i].createdById === id) {
        return this.getMemberByIdIn(input[i].createdById).firstName;
      } else if (input[i].assignedToId === id) {
        return this.getMemberByIdIn(input[i].assignedToId).firstName;
      } else if (input[i].assignedById === id) {
        return this.getMemberByIdIn(input[i].assignedById).firstName;
      }
    }
    return "None";
  };
  getAssignedTask = (id) => {
    var input, i, c;
    c = 0;
    input = this.state.tasks;
    for (i = 0; i < input.length; i++) {
      if (input[i].assignedToId === id) {
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
      name = name.slice(0, 15) + "...";
    }
    return name;
  };

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
  getMemberByIdIn(id) {
    return this.state.members.find((t) => t._id == id);
  }
  sortCategory = (path) => {
    const taskss = this.state.tasks.sort(function (a, b) {
      if (path === "usedTime") {
        return a.usedTime - b.usedTime;
      } else if (path === "name") {
        return ("" + a.name).localeCompare(b.name);
      } else if (path === "id") {
        return ("" + a.assignedToId).localeCompare(b.assignedToId);
      } else if (path == "Group ID") {
        return ("" + a.teamId).localeCompare(b.teamId);
      } else if (path == "Estimated Time") {
        return a.estimatedTime - b.estimatedTime;
      }
    });
    const task = taskss.reverse();
    this.setState({ task });
  };
  print = (event, hi) => {
    var k;
    var filter, item, a, i, txtValue, fil, abyValue, assValue, creValue;
    item = document.getElementsByClassName("col-sm-4");
    filter = document.getElementsByClassName("filters");
    abyValue = this.getMemberByIdIn(filter[0].value).firstName;
    assValue = this.getMemberByIdIn(filter[1].value).firstName;
    creValue = this.getMemberByIdIn(filter[2].value).firstName;
    for (i = 0; i < item.length; i++) {
      a = item[i];

      var uAbyValue, uAssValue, uCreValue;
      uAbyValue = a.childNodes[3].textContent.replace("Assigned By: ", "");
      uAssValue = a.childNodes[4].textContent.replace("Assigned To: ", "");
      uCreValue = a.childNodes[2].textContent.replace("Created By: ", "");
      item[i].style.display = "none";
      if (
        (filter[0].value == "DEFAULT" || abyValue == uAbyValue) &&
        (filter[1].value == "DEFAULT" || assValue == uAssValue) &&
        (filter[2].value == "DEFAULT" || abyValue == uAssValue)
      ) {
        item[i].style.display = "";
      }
    }
  };
  resetOptions() {
    var item = document.getElementsByClassName("filters");
    var appear = document.getElementsByClassName("col-sm-4");
    for (let i = 0; i < item.length; i++) {
      item[i].selectedIndex = 0;
    }
    for (let i = 0; i < appear.length; i++) {
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
          {this.state.currentUser.rank < 3 && (
            <Link to="/taskDetail/new">
              <button className="float-right btn btn-outline-primary">
                Add new task
              </button>
            </Link>
          )}

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

                <Link to={`/team/${task.teamId}`}>
                  <p className="mt-4">
                    <span className="font-weight-bold">Team: </span>
                    {task.teamId}
                  </p>
                </Link>
                <p className="mt-4">
                  <span className="font-weight-bold">Assigned By: </span>
                  <Link to={`/personal/${task.assignedById}`}>
                    {task.assignedById != "" && (
                      <img
                        src={this.getMemberByIdIn(task.assignedById).profilePic}
                        style={{ borderRadius: "50%", width: "20px" }}
                      />
                    )}
                    <span style={{ marginLeft: "5px" }}>
                      {this.getMemberByIdIn(task.assignedById).firstName}
                    </span>
                  </Link>
                </p>
                <p className="mt-4">
                  <span className="font-weight-bold">Assigned To: </span>
                  {task.assignedToId != "" && (
                    <Link to={`/personal/${task.assignedToId}`}>
                      <img
                        src={this.getMemberByIdIn(task.assignedToId).profilePic}
                        style={{ borderRadius: "50%", width: "20px" }}
                      />

                      <span style={{ marginLeft: "5px" }}>
                        {this.getMemberByIdIn(task.assignedToId).firstName}
                      </span>
                    </Link>
                  )}
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
                    disabled={!(task.assignedToId === "")}
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
