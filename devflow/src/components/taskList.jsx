import React, { Component, Fragment } from "react";
import "./taskList.css";
import { getTasksByTeam, joinTask, finishTask } from "../services/taskService";
import {
  getAllMembers,
  getMemberById,
  getMembersByTeamId,
} from "../services/memberService";
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
    members: [],
  };

  async componentDidMount() {
    if (localStorage.rank == 0) {
      this.props.history.push("/admin");
    }
    else if (localStorage.rank == 1) {
      this.props.history.push("/ceo/" + localStorage.companyId);
    }
    else if (localStorage.teamId == "") {
      this.props.history.push("/company/" + localStorage.companyId);
    }
    const memberId = localStorage.memberId;
    const teamId = localStorage.teamId;
    const koo = await getMembersByTeamId(teamId);
    const boss = await getMemberById(memberId);
    const member = await boss.json();
    if (member.teamId != "") {
      const task = await getTasksByTeam(member.teamId, memberId);
      let teamTasks = await task.json();
      let team = await koo.json();
      this.setState({
        tasks: teamTasks,
        currentUser: member,
        members: team,
      });
    }
  }
  findMember(id) {
    console.log(id);
    console.log(this.state.tasks);
    console.log(this.state.members);
    console.log(this.state.members.find((t) => t._id === id));
    return this.state.members.find((t) => t._id === id);
  }
  findMemberFirstName(id) {
    if (this.findMember(id) == null) {
      return "";
    } else {
      return this.findMember(id).firstName;
    }
  }
  async handleJoin(task) {
    joinTask(task._id, this.state.currentUser._id);
    window.location.reload();
  }
  async handleFinish(task) {
    finishTask(task._id);
    window.location.reload();
  }

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
      txtValue = a.children[0].textContent;
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
  print = (event, hi) => {
    var filter, item, a, i, txtValue, fil, abyValue, assValue;
    item = document.getElementsByClassName("col-sm-4");
    filter = document.getElementsByClassName("filters");
    abyValue = this.findMemberFirstName(filter[0].value);
    assValue = this.findMemberFirstName(filter[1].value);
    for (i = 0; i < item.length; i++) {
      a = item[i];

      var uAbyValue, uAssValue;
      uAbyValue = a.childNodes[2].textContent.replace("Assigned By: ", "");
      uAssValue = a.childNodes[3].textContent.replace("Assigned To: ", "");
      item[i].style.display = "none";
      if (
        (filter[0].value == "DEFAULT" || abyValue == uAbyValue) &&
        (filter[1].value == "DEFAULT" || assValue == uAssValue)
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
            placeholder="Search Task Title.."
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
          </div>

          {this.state.currentUser.rank < 3 && (
            <Link to="/taskDetail/new">
              <button className="float-right btn btn-outline-primary">
                Add new task
              </button>
            </Link>
          )}

          <div className="row justify-content-center">
            {this.state.tasks.map(
              (task) =>
                task.isFinish == "false" && (
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
                            src={this.findMember(task.assignedById).profilePic}
                            style={{ borderRadius: "50%", width: "20px" }}
                          />
                        )}
                        <span style={{ marginLeft: "5px" }}>
                          {this.findMember(task.assignedById).firstName}
                        </span>
                      </Link>
                    </p>
                    <p className="mt-4">
                      <span className="font-weight-bold">Assigned To: </span>
                      {task.assignedToId != "" && (
                        <Link to={`/personal/${task.assignedToId}`}>
                          <img
                            src={this.findMember(task.assignedToId).profilePic}
                            style={{ borderRadius: "50%", width: "20px" }}
                          />
                          <span style={{ marginLeft: "5px" }}>
                            {this.findMember(task.assignedToId).firstName}
                          </span>
                        </Link>
                      )}
                    </p>
                    <p className="font-weight-light mt-4">
                      Time spent: {task.usedTime} hrs
                    </p>
                    <p className="font-weight-light mt-4">
                      Estimated Time: {task.estimatedTime} hrs
                    </p>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => this.handleJoin(task)}
                        className="btn btn-danger mr-1"
                        disabled={!(task.assignedToId === "")}
                      >
                        Join
                      </button>
                      <button
                        onClick={() => this.handleFinish(task)}
                        className="btn btn-warning mr-1"
                        disabled={
                          !(task.assignedToId === this.state.currentUser._id)
                        }
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default taskList;
