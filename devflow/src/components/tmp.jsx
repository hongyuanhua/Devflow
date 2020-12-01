import React, { Component } from 'react'
import { login, checkSession } from "../services/authService";

class Tmp extends Component {

    state = {}
    render() {
        console.log("In tmp")
        console.log(login("user", "user"))
        // console.log("checkSession()")
        // console.log(checkSession())
        return (
            <div>
                {/* <h1>{login("user", "user")}</h1> */}
                {/* <h1>{getCurrMember()}</h1> */}
            </div>
        );

    }
}

export default Tmp;