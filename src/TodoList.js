import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Api from './Api';

function TodoList({ urlUsers, urlTodos, isActiveSortBtn }) {
  const initialState = {
    loading: true,
    preparedData: [],
    sort: null,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      sort: !prev.sort,
    }));
  }, [isActiveSortBtn]);

  useEffect(() => {
    async function fetchData() {
      const todos = await new Api(urlTodos).getData();
      const users = await new Api(urlUsers).getData();

      setState({
        loading: false,
        preparedData: todos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        })),

      });
    } fetchData();
  }, [urlTodos, urlUsers]);

  const { preparedData, sort } = state;

  const dataFromServer = sort
    ? preparedData.sort((a, b) => a.completed - b.completed)
    : preparedData.sort((a, b) => b.completed - a.completed);

  return (

    <>

      { state.loading

        && (
          <div className="spiner">
            <h1>LOADING...</h1>
          </div>

        )
      }

      {dataFromServer.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </>

  );
}

export default TodoList;

TodoList.propTypes = {
  urlUsers: PropTypes.objectOf(PropTypes.any).isRequired,
  urlTodos: PropTypes.objectOf(PropTypes.any).isRequired,
  isActiveSortBtn: PropTypes.objectOf(PropTypes.any).isRequired,
};
