import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers } from "../../actions/users";

const UsersList = () => {
  const users = useSelector((state) => state.users);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    console.log(user);
    setCurrentIndex(index);
  };

  console.log(users);

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div className="col-md-4" >
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

      <div className="col-md-9" style={{border: '2px solid rgb(100, 218, 100)', borderRadius: '8px', height: '70%', marginTop: '35px', padding: '15px'}}>
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

          </div>
        ) : (
          <div>
            <br />
            <p>Select the user for info...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
