/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  setTodo: (id: Todo) => void,
  query: string,
  filterBy: FilterBy,
  setLoading: (loading: boolean) => void;
};

let allTodos: Todo[] = [];

export const TodoList: React.FC<Props> = ({
  setTodo,
  query,
  filterBy,
  setLoading,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(someTodos => {
        allTodos = someTodos;
        setTodos(someTodos);
        setLoading(false);
      });
  }, []);

  useMemo(() => {
    if (query) {
      if (filterBy === 'all') {
        setTodos(allTodos.filter(todo => todo.title.includes(query)));
      }

      if (filterBy === 'active') {
        setTodos(allTodos.filter(todo => todo.title.includes(query) && !todo.completed));
      }

      if (filterBy === 'completed') {
        setTodos(allTodos.filter(todo => todo.title.includes(query) && todo.completed));
      }
    }

    if (!query) {
      if (filterBy === 'all') {
        setTodos(allTodos);
      }

      if (filterBy === 'active') {
        setTodos(allTodos.filter(todo => !todo.completed));
      }

      if (filterBy === 'completed') {
        setTodos(allTodos.filter(todo => todo.completed));
      }
    }
  }, [query, filterBy]);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && <i className="fas fa-check" />}
            </td>
            <td className="is-vcentered">
              <p className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setTodo(todo)}
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
