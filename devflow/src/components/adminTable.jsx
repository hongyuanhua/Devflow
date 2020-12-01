import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class adminTable extends Component {
  columns = [];

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

export default adminTable;
