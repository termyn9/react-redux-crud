import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers, findUserByUsername } from "../../actions/users";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector((state) => state.users);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUsername, setSearchUsername] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const onChangeSearchUsername = (event) => {
    const searchUsername = event.target.value;
    setSearchUsername(searchUsername);
    if (searchUsername === "") {
      dispatch(retrieveUsers());
    }
  };

  const findByUsername = () => {
    setCurrentIndex(-1);
    setCurrentUser(null);

    dispatch(findUserByUsername(searchUsername));
  };

  return (
    <div className="column">
      <div className="col-md-7">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username..."
            value={searchUsername}
            onChange={onChangeSearchUsername}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByUsername}
          >
            Search
          </button>
        </div>
      </div>

      <div className="row">
      <div className="col-md-4">
        <h4>Users List</h4>
        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                key={index}
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
              >
                {user.username}
              </li>
            ))}
        </ul>
      </div>

      <div
        className="col-md-8"
        style={{
          border: "2px solid rgb(100, 218, 100)",
          borderRadius: "8px",
          height: "70%",
          marginTop: "35px",
          padding: "15px",
        }}
      >
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentUser.username}
            </div>

            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>

            <div>
              <label>
                <strong>Password:</strong>
              </label>{" "}
              {currentUser.password}
            </div>

            <div>
              <label>
                <strong>Role:</strong>
              </label>{" "}
              {currentUser.roles}
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            
          </div>
        ) : (
          <div>
            <br />
            <p>Select the user for info...</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default UsersList;
