import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class TaskTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (task) => (
        <Link to={`/taskDetail/${task._id}`}>{task.name}</Link>
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
      path: "estimatedTime",
      label: "Time Estimated",
    },
    {
      path: "usedTime",
      label: "Time Used",
    },
  ];

  render() {
    const { tasks, onSort, sortColumn, onDelete } = this.props;

    return (
      <Table
        columns={this.columns}
        data={tasks}
        sortColumn={sortColumn}
        onSort={onSort}
        onDelete={this.handleDelete}
      />
    );
  }
}

export default TaskTable;
