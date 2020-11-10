import React from "react";

const Textarea = ({ name, label, value, onChange, rows, error }) => {
  return (
    <div className="row">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        onChange={onChange}
        rows={rows}
        value={value}
        className="form-control"
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Textarea;
