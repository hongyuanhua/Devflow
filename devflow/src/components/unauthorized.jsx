import React, { Component } from 'react'
import { logout } from "../services/authService";


class Unauthorized extends Component {
    async componentDidMount() {
        localStorage.clear();
        logout()
    }

    render() {
        return (<h1>You are not authorized.</h1>);
    }
}

export default Unauthorized;