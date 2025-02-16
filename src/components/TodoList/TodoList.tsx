import { useState, useEffect, useContext } from 'react';

import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

import { TodoContext } from '../../Contexts/TodoContext';

export const TodoList = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { filterBy } = useContext(TodoContext);
  const { searchQuery } = useContext(TodoContext);
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);

  const filteredTodos = todos.filter(todo => {
    if (filterBy !== 'all') {
      const isCompleted =
        filterBy === 'completed' ? todo.completed : !todo.completed;

      if (!isCompleted) {
        return false;
      }
    }

    if (
      searchQuery &&
      !todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  {
    /* eslint-disable react-hooks/exhaustive-deps */
  }

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => {
          return (
            <tr
              data-cy="todo"
              className={
                currentTodo?.id === todo.id ? 'has-background-info-light' : ''
              }
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        currentTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
