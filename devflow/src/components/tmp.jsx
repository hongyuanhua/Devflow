import React, { Component } from "react";
import { getAllCompany, getCompanyById } from "../services/companyService";
import { getNotificationByToId } from "../services/notificationService";
import { getMemberById } from "../services/memberService";

class Tmp extends Component {
  state = {
    companies: [],
    company: {},
    notifications: [],
    member: {},
  };

  async componentDidMount() {
    const companies = await getAllCompany();

    if (companies.status == 200) {
      let cs = await companies.json();
      this.setState({ companies: cs });
    }

    const company = await getCompanyById("3");
    if (company.status == 200) {
      let c = await company.json();
      this.setState({ company: c });
    }

    const m = await getMemberById("1");
    if (m.status == 200) {
      let member = await m.json();
      this.setState({ member });
    }
  }
  render() {
    console.log("In tmp");
    // console.log(await getAllCompany())
    // console.log(await getCompanyById("1"))
    // console.log(this.state.companies);
    // console.log(this.state.company);
    console.log(this.state.member);

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
