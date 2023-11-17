import React, { useEffect, useState, useContext } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { FilterContext } from '../Contex/FilterContex';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { filter, setFilter } = useContext(FilterContext);
  const { select, query } = filter;

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const selectedTodos = () => {
    switch (select) {
      case ('active'):
        return todos.filter(item => item.completed === false);
      case ('completed'):
        return todos.filter(item => item.completed === true);
      default:
        return todos;
    }
  };

  const filteredTodos = () => {
    if (query) {
      // eslint-disable-next-line max-len
      return selectedTodos().filter(item => item.title.split(' ').join('').toLowerCase()
        .includes(query.trim().toLowerCase()));
    }

    return selectedTodos();
  };

  return (
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
        {filteredTodos().map(todo => (
          <tr data-cy="todo" key={todo.id} className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setFilter((item) => ({
                  ...item, todo, modalOn: true,
                }))}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
