import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class adminTeamTable extends Component {
  columns = [
    {
      path: "_id",
      label: "Id",
    },
    {
      path: "companyId",
      label: "companyId",
    },
    {
      path: "teamName",
      label: "teamName",
      content: (team) => <Link to={`/team/${team._id}`}>{team.teamName}</Link>,
    },
    {
      path: "quote",
      label: "quote",
    },
    {
      path: "teamPic",
      label: "teamPic",
    },
    {
      key: "delete",
      content: (team) => (
        <button
          onClick={() => this.props.onDelete(team)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
    {
      key: "Modify",
      content: (team) => (
        <a
          href={"./mt/" + team._id}
          className="btn btn-primary btn-sm "
          tabindex="-1"
          role="button"
          aria-disabled="false"
        >
          Modify
        </a>
      ),
    },
  ];
  render() {
    const { teams, onSort, sortColumn, onDelete } = this.props;

    return (
      <Table
        columns={this.columns}
        data={teams}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default adminTeamTable;
