import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class adminCompanyTable extends Component {
  columns = [
    {
      path: "_id",
      label: "id",
    },
    {
      path: "name",
      label: "name",
      content: (company) => (
        <Link to={`/company/${company._id}`}>{company.name}</Link>
      ),
    },
    {
      path: "bossId",
      label: "bossId",
    },
    {
      key: "Modify",
      content: (company) => (
        <a
          href={"/mc/" + company._id}
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
      content: (company) => (
        <button
          onClick={() => this.props.onDelete(company)}
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

export default adminCompanyTable;
