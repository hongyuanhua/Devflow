import React from "react";
import IntroPage from "./components/introPage.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import TaskDetail from "./components/taskDetail.jsx";
import TaskList from "./components/taskList.jsx";
import TaskDetail_Present from "./components/taskDetail_Present.jsx";
import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";

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
            <Route exact path="/taskDetail/:id" component={TaskDetail} />
            <Route exact path="/taskList" component={TaskList} />
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
