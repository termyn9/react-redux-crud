import {
  RETRIEVE_USERS,
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
} from "../actions/typesUsers";

const initialState = [];

const userReducer = (users = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return [...users, action.payload];

    case RETRIEVE_USERS:
      return action.payload;

    case UPDATE_USER:
      return users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          };
        } else {
          return user;
        }
      });

    case DELETE_USER:
      return users.filter(({ id }) => id !== action.payload.id);

    default:
      return users;
  }
};

export default userReducer;
