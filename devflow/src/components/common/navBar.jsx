import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCompanyById } from "./../../services/companyService";
import { getMemberById } from "./../../services/memberService";
import { getNotificationByToId } from "./../../services/notificationService";
import { getTeamById } from "./../../services/teamService";
import { logout } from "./../../services/authService";

class NavBar extends Component {
  state = {
    data: [],
    memberId: "",
    companyId: "",
    teamId: "",
    memberName: "",
    companyName: "",
    teamName: "",
    rank: null,
  };

  async componentWillMount() {
    let memberId = localStorage.memberId;
    let companyId = localStorage.companyId;
    let teamId = localStorage.teamId;
    let rank = localStorage.rank;
    this.setState({ memberId, companyId, teamId, rank });

    const member = await getMemberById(memberId);
    if (member.status == 200) {
      let members = await member.json();
      this.setState({ memberName: members.firstName + " " + members.lastName });
    }

    const company = await getCompanyById(companyId);
    if (company.status == 200) {
      let companys = await company.json();
      this.setState({ companyName: companys.name });
    }

    if (teamId != "") {
      const team = await getTeamById(teamId);
      if (team.status == 200) {
        let teams = await team.json();
        this.setState({ teamName: teams.teamName });
      }
    }

    const notification = await getNotificationByToId(memberId);

    if (notification.status == 200) {
      let notifications = await notification.json();
      notifications = notifications.filter((g) => {
        g.time = new Date(g.time);
        return g;
      });
      notifications.sort((a, b) => a.time.getTime() - b.time.getTime());

      this.setState({ data: notifications });
    }
  }

  getUnread = () => {
    let filtered = this.state.data.filter((n) => {
      return n.isUnread;
    });

    return filtered;
  };

  logout = async () => {
    localStorage.clear();
    await logout();
  };

  render() {
    let unreadNotifications = this.getUnread();
    let numberOfUnreadNotifications = unreadNotifications.length;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <a className="navbar-brand" href="/taskList">
          DevFlow
        </a>
        {this.state.companyId != "" && (
          <Link to={"/company/" + this.state.companyId} className={"mx-2"}>
            <button className="btn btn-sm btn-outline-primary" type="button">
              {this.state.companyName}
            </button>
          </Link>)
        }
        {this.state.teamId != "" && (
          <Link to={"/team/" + this.state.teamId} className={"mx-2"}>
            <button className="btn btn-sm btn-outline-secondary" type="button">
              {this.state.teamName}
            </button>
          </Link>
        )}
        {this.state.memberId != "" && (
          <Link to={"/personal/" + this.state.memberId} className={"mx-2"}>
            <button className="btn btn-sm btn-outline-success" type="button">
              {this.state.memberName}
            </button>
          </Link>
        )}

        {this.state.rank == 1 && (
          <Link to={"/ceo/" + this.state.companyId}>
            <button className="btn btn-sm btn-outline-secondary" type="button">
              CEO Page
            </button>
          </Link>
        )}

        <ul className="navbar-nav mr-auto"></ul>

        <Link to={"/"} className="mr-5">
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            onClick={() => this.logout()}
          >
            Log out
          </button>
        </Link>

        {this.props.atPage != "notification" && this.rank != 0 && (
          <form className="form-inline my-2 my-lg-0">
            {numberOfUnreadNotifications > 0 && (
              <Link to={"/notification/" + localStorage.memberId + "/Unread"}>
                <button className="btn btn-outline-warning" type="button">
                  Unread Notifications: {numberOfUnreadNotifications}
                </button>
              </Link>
            )}
            {numberOfUnreadNotifications == 0 && (
              <Link to={"/notification/" + localStorage.memberId}>
                <button
                  className="btn btn-sm btn-outline-success"
                  type="button"
                >
                  Notifications
                </button>
              </Link>
            )}
          </form>
        )
        }
      </nav>
    );
  }
}

export default NavBar;
