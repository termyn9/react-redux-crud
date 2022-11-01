import UserService from "../../services/auth/user.service";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class BoardAdmin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        content: ""
      };
    }
  
    componentDidMount() {
      UserService.getAdminBoard().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    }
  
    render() {
      return (
        <div className="container" style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <ul>
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
              </li>
              <li className="nav-item" >
              <Link to={"/add-user"} className="nav-link">
                Add user
              </Link>
              </li>
            </ul>
          </div>
          
          <header className="jumbotron" style={{width: '80%'}}>
            <h3>{this.state.content}</h3>
          </header>
        </div>
      );
    }
  }