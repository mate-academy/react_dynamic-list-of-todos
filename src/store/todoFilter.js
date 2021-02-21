// const SET_USER = 'SET_USER';
// const HIDE_USER = 'HIDE_USER';

const initialState = {
  filter: 'ALL',
  // handlerFilterStatus: '',
  todoTitle: '',
};

export const todoFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        filter: action.payload,
      };

    case 'ACTIVE':
      return {
        ...state,
        filter: 'ACTIVE',
      };

    case 'COMPLETED':
      return {
        ...state,
        filter: 'COMPLETED',
      };

    case 'CHANGE_SEARCH_TITLE':
      return {
        ...state,
        todoTitle: action.payload,
      };

    default:
      return state;
  }
};

export const selectFilter = filter => ({
  type: 'ALL',
  payload: filter,
});

export const handleInput = todoTitle => ({
  type: 'CHANGE_SEARCH_TITLE',
  payload: todoTitle,
});
