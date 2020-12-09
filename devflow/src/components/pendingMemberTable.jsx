import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class pendingMemberTable extends Component {
  columns = [
    {
      path: "_id",
      label: "Id",
    },
    {
      path: "firstName",
      label: "firstName",
    },
    {
      path: "lastName",
      label: "lastName",
    },
    {
      path: "userName",
      label: "userName",
    },
    {
      path: "password",
      label: "password",
    },
    {
      path: "rank",
      label: "rank",
    },
    {
      path: "companyId",
      label: "companyId",
    },
    {
      path: "teamId",
      label: "teamId",
    },
    {
      path: "profilePic",
      label: "profilePic",
    },
    {
      key: "approve",
      content: (member) => (
        <button
          onClick={() => this.props.onApprove(member)}
          className="btn btn-success btn-sm"
        >
          Approve
        </button>
      ),
    },
    {
      key: "delete",
      content: (member) => (
        <button
          onClick={() => this.props.onDelete(member)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { members, onSort, sortColumn, onDelete, onApprove } = this.props;

    return (
      <Table
        columns={this.columns}
        data={members}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default pendingMemberTable;
