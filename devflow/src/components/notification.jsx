import React, { Component } from "react";
import NavBar from "./common/navBar";
import { readAll } from "../services/notificationService";
import { getNameById } from "../services/fakeMemberService";
import { getMemberById } from "../services/memberService";
import { Link } from "react-router-dom";
import Comment from "./common/comment.jsx";
import ListGroup from "./common/listGroup.jsx";
import { getNotificationByToId } from "./../services/notificationService";
import { notifications } from "./../services/fakeNotificationServices";
import { members } from "./../services/fakeMemberService";
import { config } from "../config";

class Notification extends Component {
  state = {
    userId: -1,
    entry: null,
    data: [],
    types: ["All", "Unread", "System", "Non-System"],
    selectedNotificationType: "",
  };

  componentWillMount() {
  }

  async componentDidMount() {
    let userId = localStorage.memberId;
    if (userId != this.props.match.params.id) {
      this.props.history.push("/unauthorized")
    }
    this.setState({ userId });

    let entry = this.props.match.params.entry;
    this.setState({ entry });
    this.setState({ selectedNotificationType: entry });

    if (entry == "Unread") {
      await readAll(userId);
    }

    let ns = await getNotificationByToId(userId);
    if (ns.status == 200) {
      let notifications = await ns.json();
      notifications = notifications.filter((g) => {
        g.time = new Date(g.time);
        return g;
      });
      notifications.sort((a, b) => a.time.getTime() - b.time.getTime());

      console.log(notifications);
      for (let i in notifications) {
        // console.log(i);
        const m = await getMemberById(notifications[i].from);
        if (m.status == 200) {
          let member = await m.json();
          notifications[i].from = member.firstName + " " + member.lastName;
        }
      }

      this.setState({ data: notifications });
    }
    // consnotificationsole.log(notifications)
  }

  handleGenreSelect = async (curType) => {
    console.log("handleGenreSelect")
    await readAll(this.state.userId);
    console.log("curType: ", curType);
    this.setState({ selectedNotificationType: curType });
  };

  getFiltered = () => {
    const select_type = this.state.selectedNotificationType;

    let filtered = this.state.data.filter((n) => {
      // return true
      if (select_type === "" || select_type === "All") {
        return true;
      }
      if (select_type === "Unread") {
        return n.isUnread;
      }
      if (select_type === "System") {
        return n.level === "1";
      }
      if (select_type === "Non-System") {
        return n.from !== "System";
      }
    });

    return filtered;
  };

  render() {
    let filtered = this.getFiltered();
    console.log("After filted");
    console.log(filtered);
    const curNotificationNumber = filtered.length;

    return (
      <React.Fragment>
        <NavBar atPage="notification" />
        <div className="row mx-3">
          <div className="col-3">
            <h1></h1>
            <ListGroup
              items={this.state.types}
              selectedItem={this.state.selectedNotificationType}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <h1>Notifications</h1>
            <div className="list-group">
              {filtered.map((n) => (
                <Comment
                  from={n.from}
                  time={n.time.toLocaleString()}
                  message={n.message}
                  key={n._id}
                  level={n.level}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Notification;
