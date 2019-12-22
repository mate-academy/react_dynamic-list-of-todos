import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import url from '../api/urls';
import getData from '../api/Api';

function TodoList({ ActiveSortBtn, filterType }) {
  const initialState = {
    loading: true,
    preparedData: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      const todos = await getData(url.TODOS);
      const users = await getData(url.USERS);

      setState(prevState => ({
        ...prevState,
        loading: false,
        preparedData: todos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        })),

      }));
    } fetchData();
  }, []);

  const { preparedData } = state;

  const dataFromServerForRender = () => {
    const { sortById, sortByStatus, sortByUsersName, sortByTitle } = filterType;
    const { sortValue, clickedSortBtn } = ActiveSortBtn;
    let result = [];

    switch (sortValue) {
      case sortById:
        result = !clickedSortBtn
          ? [...preparedData].sort((a, b) => a.id - b.id)
          : [...preparedData].sort((a, b) => b.id - a.id);
        break;
      case sortByStatus:
        result = !clickedSortBtn
          ? [...preparedData].sort((a, b) => a.completed - b.completed)
          : [...preparedData].sort((a, b) => b.completed - a.completed);
        break;
      case sortByUsersName:
        result = !clickedSortBtn
          ? [...preparedData]
            .sort((a, b) => a.user.name.localeCompare(b.user.name))
          : [...preparedData]
            .sort((a, b) => b.user.name.localeCompare(a.user.name));
        break;
      case sortByTitle:
        result = !clickedSortBtn
          ? [...preparedData]
            .sort((a, b) => a.title.localeCompare(b.title))
          : [...preparedData]
            .sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: result = preparedData;
    }

    return result;
  };

  return (

    <>

      { state.loading

        && (
          <thead className="spiner">
            <tr>
              {Array(Object.values(filterType)
                .map(loading => (
                  <th key={loading}>
                    {loading
                      .replace(/[(A-Z )]+/, 'Loading...')}
                  </th>
                )))}
            </tr>
          </thead>

        )
      }

      {dataFromServerForRender().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </>

  );
}

export default TodoList;

TodoList.propTypes = {
  ActiveSortBtn: PropTypes.shape({
    sortValue: '',
    clickedSortBtn: null,
  }).isRequired,
};

TodoList.propTypes = {
  filterType: PropTypes.shape({
    sortById: '',
    sortByStatus: '',
    sortByUsersName: '',
    sortByTitle: '',
  }).isRequired,
};
