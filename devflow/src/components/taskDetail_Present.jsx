import React from "react";
import NavBar from "./common/navBar";
import { Link } from "react-router-dom";
import "./taskDetail_Present.css";
import { getMemberById, getAllMembers } from "./../services/memberService";
import { getTasksById, updateTask } from "../services/taskService";

class taskDetail_Present extends React.Component {
  state = {
    data: {
      _id: "",
      teamId: "",
      companyId: "",
      name: "",
      estimatedTime: 0,
      usedTime: 0,
      assignedToId: "",
      assignedById: "",
      taskDetail: "",
      isFinish: "",
    },
    members: [],
    current: {},
  };

  async componentWillMount() {
    const new_members = await getAllMembers();
    if (new_members.status == 200) {
      let member = await new_members.json();
      this.setState({ members: member });
    }
    // console.log(new_members);
    // console.log(this.state.members);

    const taskId = this.props.match.params.id;
    if (taskId === "new") return;
    // console.log(taskId);
    const memberId = localStorage.memberId;
    const current = await getMemberById(memberId);
    if (current.status == 200) {
      let member = await current.json();
      this.setState({ current: member });
    }
    const tasks = await getTasksById(taskId);
    if (tasks.status == 200) {
      let task = await tasks.json();
      console.log(task);
      console.log(this.state.data);
      if (!task) return this.props.history.replace("/not-found");
      this.setState({ data: this.mapToViewModel(task) });
    }
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
      isFinish: task.isFinish,
    };
  }
  filterID(id) {
    // console.log(members);
    // console.log(id);
    const member = this.state.members.filter((member) => member._id === id);
    console.log(member);
    if (member.length === 0) {
      return "";
    }
    return member[0].firstName;
  }
  submitUsedTime() {
    const inputVal = parseInt(document.getElementById("usedTimeInput").value);
    if (Number.isInteger(inputVal) && inputVal > -1) {
      const newData = this.state.data;
      newData.usedTime = inputVal;
      console.log(this.state.data);
      console.log(newData);
      updateTask(newData);
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <label htmlFor="taskName">Task Name:</label>
          <p>{this.state.data.name}</p>
          {/* for taskName */}

          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <label htmlFor="assignedTo">Assigned to:</label>
                  <p>{this.filterID(this.state.data.assignedToId)}</p>
                  {/* for assignedTo */}
                </div>
                <div className="col">
                  <label htmlFor="assignedBy">Assigned by:</label>
                  <p>{this.filterID(this.state.data.assignedById)}</p>
                  {/* for assignedBy */}
                </div>
              </div>
              <label htmlFor="taskDetail">Task Description:</label>
              <p>{this.state.data.taskDetail}</p>
              {/* for taskDetail */}
            </div>

            <div className="col-1"></div>

            <div className="col-3">
              <div className="row"></div>
              <div className="row">
                <label htmlFor="estimatedTime">Estimated Time:</label>
                <p>{this.state.data.estimatedTime}</p>
                {/* for estimatedTime */}
              </div>
              <div className="row"></div>
              <div className="row">
                <label htmlFor="usedTime">Used Time:</label>
                <p>{this.state.data.usedTime}</p>
                {/* for usedTime */}
              </div>
              <div className="row">
                <Link to="/taskList">
                  <button type="button" className="btn btn-primary">
                    Back
                  </button>
                </Link>
              </div>
              <br></br>
              {console.log(this.state.current.rank)}
              {this.state.isFinish === "false" && (
                <div className="row">
                  {this.state.current.rank < 3 && (
                    <Link to={`/taskDetail/${this.state.data._id}`}>
                      <button type="button" className="btn btn-primary">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
            {this.state.data.assignedToId === this.state.current._id &&
              this.state.isFinish === "false" && (
                <div className="col-3">
                  <input
                    className="form-control mg-2"
                    id="usedTimeInput"
                    type="text"
                    placeholder="Change used time.."
                  ></input>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.submitUsedTime()}
                  >
                    Submit
                  </button>
                </div>
              )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default taskDetail_Present;
