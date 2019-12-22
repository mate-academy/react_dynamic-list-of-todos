import React, { useState } from 'react';
import TodoList from './components/TodoList';
import './css/App.css';

const SORT_TYPE = {
  sortById: 'TODOS ID',
  sortByTitle: 'TITLE',
  sortByUsersName: 'USER NAME',
  sortByStatus: 'STATUS',
};

function App() {
  const initialState = {
    isClickedLoadTodos: false,
    isActiveSortBtn: {
      clickedSortBtn: false,
      sortValue: '',
    },
  };

  const [state, setState] = useState(initialState);

  const getListTodos = () => {
    if (!state.isClickedLoadTodos) {
      setState(prevState => ({
        ...prevState,
        isClickedLoadTodos: true,
      }));
    }
  };

  const handleSort = (idx, item) => {
    setState(prevState => ({
      ...prevState,
      isActiveSortBtn: {
        clickedSortBtn: isActiveSortBtn.sortValue === item
          ? !isActiveSortBtn.clickedSortBtn
          : true,
        sortValue: item,
      },
    }));
  };

  const { isActiveSortBtn, isClickedLoadTodos } = state;
  const { clickedSortBtn, sortValue } = isActiveSortBtn;

  const activeIconBtn = (button) => {
    if (sortValue === button && clickedSortBtn) {
      return 'arrow_drop_down';
    }

    if (sortValue === button && !clickedSortBtn) {
      return 'arrow_drop_up';
    }

    return 'sort_by_alpha';
  };

  return (
    <div className="App">

      <h1 className="nav">Dynamic list of todos</h1>
      {!isClickedLoadTodos && (
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

      {isClickedLoadTodos
      && (
        <table className="highlight responsive-table centered">
          <thead>

            <tr>
              {Object.values(SORT_TYPE).map((button, i) => (
                <th key={button}>
                  <button
                    onClick={() => handleSort(i, button)}
                    className="waves-effect waves-light btn"
                    type="button"
                  >

                    {button}
                    <i className="material-icons right">
                      {activeIconBtn(button)}
                    </i>
                  </button>
                </th>
              ))}

            </tr>
          </thead>
          <TodoList
            ActiveSortBtn={isActiveSortBtn}
            filterType={SORT_TYPE}
          />

        </table>
      )
      }
    </div>
  );
}

export default App;
