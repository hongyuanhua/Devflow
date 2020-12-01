import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class MemberTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (member) => (
        <Link to={`/personal/${member._id}`}>
          <img
            src={member.profilePic}
            style={{ borderRadius: "50%", width: "30px" }}
          ></img>
          {member.name}
        </Link>
      ),
    },
    {
      path: "rank",
      label: "Rank",
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

export default MemberTable;
