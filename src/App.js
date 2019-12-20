import React, { useState } from 'react';
import TodoList from './TodoList';
import './App.css';

const USERS = 'https://jsonplaceholder.typicode.com/users';
const TODOS = 'https://jsonplaceholder.typicode.com/todos';

function App() {
  const initialState = {
    isClicked: false,
    isActiveSortBtn: false,
  };

  const [state, setState] = useState(initialState);

  const getListTodos = () => {
    if (!state.isClicked) {
      setState(prevState => ({
        ...prevState,
        isClicked: true,
      }));
    }
  };

  const handleSort = () => {
    setState(prevState => ({
      ...prevState,
      isActiveSortBtn: !prevState.isActiveSortBtn,
    }));
  };

  const { isActiveSortBtn } = state;

  return (
    <div className="App">

      <h1 className="nav">Dynamic list of todos</h1>
      {!state.isClicked && (
        <button
          className="waves-effect waves-light btn-large"
          type="button"
          onClick={() => {
            getListTodos();
          }}
        >
        SHOW TODOS
          <i className="material-icons right">arrow_drop_down</i>
        </button>
      )
      }

      {state.isClicked
      && (
        <table className="highlight responsive-table centered">
          <thead>
            <tr>
              <th>TODOS ID</th>
              <th>TITLE</th>
              <th>USER NAME</th>
              <th>
                <button
                  onClick={handleSort}
                  className="waves-effect waves-light btn"
                  type="button"
                >
              Sort by STATUS
                  <i className="material-icons right">
                    {isActiveSortBtn ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </i>
                </button>

              </th>
            </tr>
          </thead>
          <TodoList
            urlUsers={USERS}
            urlTodos={TODOS}
            isActiveSortBtn={isActiveSortBtn}
          />

        </table>
      )
      }
    </div>
  );
}

export default App;
