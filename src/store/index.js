import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  ADD_TODOS: 'TODOS::ADD',
  SWITCH_LOADING: 'LOADING::SWITCH',
  IS_INITIALIZED: 'INITIALIZED::IS',
  HAS_ERROR: 'ERROR::HAS',
  IS_SORT: 'IS::SORT',
  ADD_SORTED_TODOS: 'SORTED_TODOS::ADD',
  DELETE_TODO: 'TODO::DELETE',
};

export const deleteTodo = idTodo => ({
  type: ACTION_TYPES.DELETE_TODO,
  payload: idTodo,
});

export const addTodos = todos => ({
  type: ACTION_TYPES.ADD_TODOS,
  payload: todos,
});

export const addSortedTodos = todosSorted => ({
  type: ACTION_TYPES.ADD_SORTED_TODOS,
  payload: todosSorted,
});

export const switchLoading = isLoading => ({
  type: ACTION_TYPES.SWITCH_LOADING,
  payload: isLoading,
});

export const initialized = isInitialized => ({
  type: ACTION_TYPES.IS_INITIALIZED,
  payload: isInitialized,
});

export const errorTodos = hasError => ({
  type: ACTION_TYPES.HAS_ERROR,
  payload: hasError,
});

export const sortTodos = () => ({
  type: ACTION_TYPES.IS_SORT,
});

export const receiveTodosAndUsers = () => (dispatch) => {
  dispatch(switchLoading(true));
  dispatch(initialized(true));
  dispatch(errorTodos(false));

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos'),
    fetch('https://jsonplaceholder.typicode.com/users'),
  ])
    .then(([responseTodos, responseUsers]) => Promise
      .all([responseTodos.json(), responseUsers.json()]))
    .then(([todos, users]) => {
      const usersMapApi = users
        .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

      function getTodosWithUsers(todosArray, usersApi) {
        return todosArray.map(todo => ({
          ...todo,
          user: usersApi[todo.userId],
        }));
      }

      const preparedTodos = getTodosWithUsers(todos, usersMapApi);
      const sortedTodos = getTodosWithUsers(todos, usersMapApi).sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }

        return 0;
      });

      dispatch(switchLoading(false));
      dispatch(addTodos(preparedTodos));
      dispatch(addSortedTodos(sortedTodos));
    })
    .catch(() => {
      dispatch(errorTodos(true));
      dispatch(switchLoading(false));
    });
};

const initialState = {
  todos: [],
  todosSorted: [],
  isLoading: false,
  isInitialized: false,
  hasError: false,
  isSorted: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODOS: {
      return {
        ...state,
        todos: [...action.payload],
      };
    }

    case ACTION_TYPES.ADD_SORTED_TODOS: {
      return {
        ...state,
        todosSorted: [...action.payload],
      };
    }

    case ACTION_TYPES.SWITCH_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case ACTION_TYPES.IS_INITIALIZED: {
      return {
        ...state,
        isInitialized: action.payload,
      };
    }

    case ACTION_TYPES.HAS_ERROR: {
      return {
        ...state,
        hasError: action.payload,
      };
    }

    case ACTION_TYPES.IS_SORT: {
      return {
        ...state,
        isSorted: !state.isSorted,
      };
    }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
