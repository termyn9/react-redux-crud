import { REGISTER_SUCCESS,  REGISTER_FAIL, SET_MESSAGE } from "./auth/type";
import { DELETE_USER, RETRIEVE_USERS, UPDATE_USER } from "./typesUsers";
import UsersService from "../services/UsersService";

export const createUser = (username, email, password, roles) => async (dispatch) => {
    try{
      const res = await UsersService.create({username, email, password, roles})
          dispatch({
            type: REGISTER_SUCCESS,
          });
      return Promise.resolve(res.data);
      } catch (err) {
        return Promise.reject(err);
      }
  }

export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await UsersService.getAll();
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const findUserByUsername = (username) => async (dispatch) => {
  try{
    const res = await UsersService.findByUsername(username);

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch(error) {
    console.log(error)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try{
    await UsersService.remove(id);

    dispatch({
      type: DELETE_USER,
      payload: { id },
    })
  } catch(error) {
    console.log(error)
  }
}

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UsersService.update(id, data);

    dispatch({
      type: UPDATE_USER,
      payload: data
    });

    return Promise.resolve(res.data)
  } catch(error) {
    return Promise.reject(error)
  }
}