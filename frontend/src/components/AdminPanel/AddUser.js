import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/users";

const AddUser = () => {
  const initialUserState = {
    username: "",
    email: "",
    password: "",
    roles: [],
  };

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleInputChangeRoles = (event) => {
    const { name, value } = event.target;
    const array = [];
    array.push(value);
    setUser({ ...user, [name]: array });
  };

  const handleSaveUser = () => {
    const { username, email, password, roles } = user;

    dispatch(createUser(username, email, password, roles))
      .then((data) => {
        setUser({
          username: data.username,
          email: data.email,
          password: data.password,
          roles: data.roles,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You add new user successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add user
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <label htmlFor="roles">Role</label>
          <div className="input-group mb-3">
            <select 
            className="custom-select" 
            id="roles"
            name="roles"
            value={user.roles}
            onChange={handleInputChangeRoles}
            >
              <option>user</option>
              <option>admin</option>
            </select>
          </div>

          <button onClick={handleSaveUser} className="btn btn-success">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
