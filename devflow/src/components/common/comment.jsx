import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ from, time, message, level }) => {
  let header;
  if (level == "1") {
    header = "System Message";
  }
  if (level == "2") {
    header = "Company Message";
  }
  if (level == "3") {
    header = "Team Announcement";
  }
  if (level == "4") {
    header = "Task Info";
  }
  if (level == "5") {
    header = "Personal Message";
  }
  return (
    <div className="list-group-item list-group-item-action">
      <div className="row">
        <div className="col-1">
          <img
            src={
              "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
            }
            style={{ borderRadius: "50%", width: "50px", marginLeft: "10px" }}
          />
        </div>
        <div className="col">
          <h5 className="mb-1">{header}</h5>
          <div className="d-flex w-100 justify-content-between">
            {level == "5" && (
              <Link to={"/personal/" + from}>
                <h6 className="mb-1">{from}</h6>
              </Link>
            )}
            {level != "5" && <h6 className="mb-1">{from}</h6>}
            <small>{time}</small>
          </div>
        </div>
      </div>
      <p className="mb-1">{message}</p>
    </div>
  );
};

export default Comment;
