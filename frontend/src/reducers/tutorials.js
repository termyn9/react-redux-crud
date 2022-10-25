import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../actions/types";

const initialState = [];

// отвечает за обновление store
// (initialState = текущее состояние, action - объект события)
const tutorialReducer = (tutorials = initialState, action) => {
  switch (action.type) {
    case CREATE_TUTORIAL:
      return [...tutorials, action.payload];

    case RETRIEVE_TUTORIALS:
      return action.payload;

    case UPDATE_TUTORIAL:
      return tutorials.map((tutorial) => {
        if (tutorial.id === action.payload.id) {
          return {
            ...tutorial,
            ...action.payload,
          };
        } else {
          return tutorial;
        }
      });

    case DELETE_TUTORIAL:
      return tutorials.filter(({ id }) => id !== action.payload.id);

    case DELETE_ALL_TUTORIALS:
      return [];

    default:
      return tutorials;
  }
};

export default tutorialReducer;