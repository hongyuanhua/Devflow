import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class adminTaskTable extends Component {
  columns = [
    {
      path: "_id",
      label: "ID",
    },
    {
      path: "companyId",
      label: "companyID",
    },
    {
      path: "name",
      label: "Tasks",
      content: (task) => (
        <Link to={`/taskDetail_Present/${task._id}`}>{task.name}</Link>
      ),
    },
    {
      path: "assignedToId",
      label: "Assign To",
    },
    {
      path: "assignedById",
      label: "Assign By",
    },
    {
      path: "teamId",
      label: "teamId",
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
      label: "Is Finish",
    },
    {
      key: "Modify",
      content: (task) => (
        <a
          href={"/taskDetail_Present/" + task._id}
          className="btn btn-primary btn-sm "
          tabIndex="-1"
          role="button"
          aria-disabled="false"
        >
          Modify
        </a>
      ),
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
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default adminTaskTable;
