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
  ];

  render() {
    const { notifications, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={notifications}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default adminTaskTable;
