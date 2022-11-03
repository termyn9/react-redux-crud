import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser } from "../../actions/users";
import UsersService from "../../services/UsersService";
import { useParams } from "react-router-dom";

const User = (props) => {

  const {id} = useParams()

  const initialUserState = {
    id: null,
    username: "",
    email: "",
    password: "",
    roles: []
  };

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getUser = id => {
    UsersService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...setCurrentUser, [name]: value });
  };

  const handleInputChangeRoles = (event) => {
    const { name, value } = event.target;
    const array = [];
    array.push(value)
    setCurrentUser({ ...setCurrentUser, [name]: array });
  }

  const updateContent = () => {
    dispatch(updateUser(currentUser.id, currentUser))
      .then(response => {
        console.log(response);
        setMessage("The user was updated successfully!");
        setTimeout(() => props.history.push("/map"), 1000)
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={currentUser.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="roles">Role</label>
              <select 
                type="text"
                className="form-control"
                id="roles"
                name="roles"
                value={currentUser.roles}
                onChange={handleInputChangeRoles}
                >
              <option>user</option>
              <option>admin</option>
            </select>
            </div>
          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p style={{color: 'green', fontSize: '18px', marginTop: '5px'}}>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a user...</p>
        </div>
      )}
    </div>
  );
};

export default User;
