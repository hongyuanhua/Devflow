import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { getAllNotificaitons, getNotificaitons } from "../../services/fakeNotificationServices"

class NavBar extends Component {
    state = {
        data: []
    }

    componentWillMount() {
        let notifications = getAllNotificaitons();
        notifications = notifications.filter(g => {
            g.time = new Date(g.time)
            return g
        });
        notifications.sort((a, b) => a.time.getTime() - b.time.getTime());

        this.setState({ data: notifications });
    }

    getUnread = () => {
        let filtered = this.state.data.filter((n) => {
            return n.isUnread
        })

        return filtered
    }

    render() {
        let unreadNotifications = this.getUnread();
        let numberOfUnreadNotifications = unreadNotifications.length;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/taskList">DevFlow</a>

                <ul className="navbar-nav mr-auto"></ul>

                {this.props.atPage != "notification" &&
                    <form className="form-inline my-2 my-lg-0">
                        {
                            numberOfUnreadNotifications > 0 && <Link to="/notification/1/Unread"><button className="btn btn-outline-warning" type="button">Unread Notifications: {numberOfUnreadNotifications}</button></Link>
                        }
                        {
                            numberOfUnreadNotifications == 0 && <Link to="/notification/1"><button className="btn btn-sm btn-outline-success" type="button">Notifications</button></Link>
                        }
                    </form>
                }
            </nav>

        );
    }
}

export default NavBar;