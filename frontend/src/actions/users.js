import { REGISTER_SUCCESS,  REGISTER_FAIL, SET_MESSAGE } from "./auth/type";
import { RETRIEVE_USERS } from "./typesUsers";
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