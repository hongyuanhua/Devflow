import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class adminMemberTable extends Component {
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
      key: "Modify",
      content: (member) => (
        <a
          href={"/mm/" + member._id}
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
      key: "Profile",
      content: (member) => (
        <a href={"/personal/" + member._id} className="btn btn-success btn-sm">
          Profile
        </a>
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
    const { members, onSort, sortColumn, onDelete } = this.props;

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

export default adminMemberTable;
