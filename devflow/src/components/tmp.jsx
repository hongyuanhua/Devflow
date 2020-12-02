import React, { Component } from 'react'
import { getAllCompany, getCompanyById } from "../services/companyService";

class Tmp extends Component {

    state = { companies: [] }

    async componentDidMount() {
        const res = await getAllCompany()
        if (res.status == 200) {
            let companies = await res.json();
            this.setState({ companies: companies });
        }
    }
    render() {
        console.log("In tmp")
        // console.log(await getAllCompany())
        // console.log(await getCompanyById("1"))
        console.log(this.state.companies)
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