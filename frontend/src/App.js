import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/SignInUp/login.component";
import Register from "./components/SignInUp/register.component";
import Profile from "./components/SignInUp/profile.component";
import BoardUser from "./components/RolePages/board-user.component";
import BoardAdmin from "./components/RolePages/board-admin.component";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Map from "./Map/Map";
import Home from "./components/Home";
import MapUser from "./Map/MapUser";

import { logout } from "./actions/auth/auth";
import { clearMessage } from "./actions/auth/message";

import { history } from "./helpers/history";
import AddUser from "./components/AdminPanel/AddUser";
import UsersList from "./components/AdminPanel/UsersList";
import User from "./components/AdminPanel/User";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <nav
          className="navbar navbar-expand navbar-light"
          style={{ backgroundColor: "rgb(180, 230, 185)" }}
        >
          <a href="/home" className="navbar-brand">
            Home
          </a>
          <div className="navbar-nav mr-auto">
            {showAdminBoard || currentUser && showAdminBoard ? (
              <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link" style={{color: 'blue'}}>
                  Administrator panel
                </Link>
              </li>
              <li className="nav-item" style={{ fontWeight: "bold" }}>
              <Link to={"/tutorials"} className="nav-link">
                Cities
              </Link>
              </li>
              <li className="nav-item" style={{ fontWeight: "bold" }}>
              <Link to={"/map"} className="nav-link">
                Map
              </Link>
              </li>
              <li className="nav-item" style={{ fontWeight: "bold" }}>
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
              </li>
              </div>
            ): currentUser && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link" style={{color: 'green', fontStyle: 'italic'}}>
                    User panel
                  </Link>
                </li>
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                <Link to={"/user/map"} className="nav-link">
                  Map
                </Link>
                </li>
            </div>
            )}
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link" style={{ position: "relative", left: 120, fontWeight: "bold", color: 'white'}}>
                    User: {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut} style={{ position: "absolute", right: 10, fontWeight: "bold" }}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto" style={{width: '160px', position: 'absolute', right: 10, marginTop: '-20px'}}>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" style={{ position: "absolute", right: 80, fontWeight: "bold"  }}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link" style={{ position: "absolute", right: 10, fontWeight: "bold"  }}>
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <div className="container-md" style={{ marginTop: "18px" }}>
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route path={"/home"} component={Home}/>
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route path="/map" component={Map} />

            <Route path="/user/map" component={MapUser} />
            <Route path="/user" component={BoardUser}/>

            <Route path="/admin" component={BoardAdmin} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/users" component={UsersList} />
            <Route path="/users/:id" component={User} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
