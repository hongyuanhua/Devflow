import React from "react";
import IntroPage from "./components/introPage.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Personal from "./components/personal.jsx";
import Tmp from "./components/tmp.jsx";
import TaskDetail from "./components/taskDetail.jsx";
import TaskList from "./components/taskList.jsx";
import Unauthorized from "./components/unauthorized.jsx";
import Notification from "./components/notification.jsx";
import TaskDetail_Present from "./components/taskDetail_Present.jsx";
import Company from "./components/company.jsx";
import Admin from "./components/admin.jsx";
import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import Team from "./components/team.jsx";
import mc from "./components/ModifyCompany.jsx";
import mt from "./components/ModifyTeam.jsx";
import mm from "./components/ModifyMember.jsx";
import ceo from "./components/ceo.jsx";
import createBrowserHistory from "history/createBrowserHistory";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
const customHistory = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div>
        <HashRouter history={customHistory}></HashRouter>
        <BrowserRouter>
          <Switch>
            {/* as a placeholder for index */}
            <Route
              exact
              path="/login"
              history={this.props.history}
              component={Login}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/tmp" component={Tmp} />
            <Route exact path="/taskDetail/:id" component={TaskDetail} />
            <Route exact path="/personal/:id" component={Personal} />
            <Route
              exact
              path="/notification/:id/:entry?"
              component={Notification}
            />
            <Route exact path="/taskList" component={TaskList} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route exact path="/company/:id" component={Company} />
            <Route exact path="/team/:id" component={Team} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/mc/:id/" component={mc} />
            <Route exact path="/mt/:id/" component={mt} />
            <Route exact path="/mm/:id/" component={mm} />
            <Route exact path="/ceo/:id" component={ceo} />
            <Route
              exact
              path="/taskDetail_Present/:id"
              component={TaskDetail_Present}
            />
            <Route path="/" component={IntroPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
