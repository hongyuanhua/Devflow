import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class CompanyTable extends Component {
  columns = [
    {
      path: "teamName",
      label: "Teams",
      content: (team) => (
        <Link to={`/team/${team._id}`}>
          <img
            src={team.teamPic}
            style={{ borderRadius: "50%", width: "30px" }}
          ></img>
          {team.teamName}
        </Link>
      ),
    },
    {
      path: "leaderName",
      label: "Leader",
      content: (team) => (
        <Link to={`/personal/${team.leader}`}>
          <img
            src={team.leaderPic}
            style={{ borderRadius: "50%", width: "30px" }}
          ></img>
          {team.leaderName}
        </Link>
      ),
    },
  ];

  render() {
    const { teams, onSort, sortColumn } = this.props;

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

export default CompanyTable;
