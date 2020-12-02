import React, { Component } from "react";
import NavBar from "./common/navBar";
import { readAllNotificationsById } from "../services/fakeNotificationServices";
import { getNameById } from "../services/fakeMemberService";
import { getMemberById } from "../services/memberService";
import { Link } from "react-router-dom";
import Comment from "./common/comment.jsx";
import ListGroup from "./common/listGroup.jsx";
import { getNotificationByToId } from "./../services/notificationService";
import { notifications } from "./../services/fakeNotificationServices";
import { members } from "./../services/fakeMemberService";

class Notification extends Component {
  state = {
    userId: -1,
    entry: null,
    data: [],
    types: ["All", "Unread", "System", "Non-System"],
    selectedNotificationType: "",
  };

  componentWillMount() {
    const userId = this.props.match.params.id;
    let entry = this.props.match.params.entry;
    this.setState({ userId });
    this.setState({ entry });
    this.setState({ selectedNotificationType: entry });
  }

  async componentDidMount() {
    let userId = localStorage.memberId;
    this.setState({ userId });

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

  handleGenreSelect = (curType) => {
    readAllNotificationsById(this.state.userId);
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
        <div className="row">
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
