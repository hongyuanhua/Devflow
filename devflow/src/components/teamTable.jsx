import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class teamTable extends Component {
  columns = [
    {
      path: "name",
      label: "Tasks",
      content: (task) => (
        <Link to={`/taskDetail_Present/${task._id}`}>{task.name}</Link>
      ),
    },
    {
      path: "assignedTo",
      label: "Assign To",
      content: (task) => (
        <Link to={`/personal/${task.assignedToId}`}>
          <img
            src={task.assignedToPic}
            style={{ borderRadius: "50%", width: "30px" }}
          ></img>
          {task.assignedTo}
        </Link>
      ),
    },
    {
      path: "assignedBy",
      label: "Assign By",
      content: (task) => (
        <Link to={`/personal/${task.assignedById}`}>
          <img
            src={task.assignedByPic}
            style={{ borderRadius: "50%", width: "30px" }}
          ></img>
          {task.assignedBy}
        </Link>
      ),
    },
    {
      path: "taskDetail",
      label: "Detail",
    },
    {
      path: "usedTime",
      label: "Used Time",
    },
    {
      path: "estimatedTime",
      label: "Estimate Time",
    },
    {
      path: "isFinish",
      label: "Finish",
    },
    {
      key: "delete",
      content: (task) => (
        <button
          onClick={() => this.props.onDelete(task)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { tasks, onSort, sortColumn, onDelete } = this.props;

    return (
      <Table
        columns={this.columns}
        data={tasks}
        onDelete={this.handleDelete}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default teamTable;
