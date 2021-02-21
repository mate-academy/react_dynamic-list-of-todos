const SET_USER = 'SET_USER';
const HIDE_USER = 'HIDE_USER';

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case HIDE_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const setUser = userId => ({
  type: SET_USER,
  payload: userId,
});

export const hideUser = () => ({
  type: HIDE_USER,
});
