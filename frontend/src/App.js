import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Map from "./Map/Map";
import EditModal from "./components/EditModal";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light" style={{backgroundColor: 'rgb(180, 230, 185)'}}>
        <a href="/tutorials" className="navbar-brand">
          Home
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item" style={{fontWeight: 'bold'}}>
            <Link to={"/tutorials"} className="nav-link">
              Cities
            </Link>
          </li>
          <li className="nav-item" style={{fontWeight: 'bold'}}>
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item" style={{fontWeight: 'bold'}}>
            <Link to={"/map"} className="nav-link">
              Map
            </Link>
          </li>
        </div>
      </nav>

      <div className="container-md" style={{marginTop: '18px'}}>
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
          <Route path="/edit-tutorial/:id" component={EditModal}/>
          <Route path="/map" component={Map}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
