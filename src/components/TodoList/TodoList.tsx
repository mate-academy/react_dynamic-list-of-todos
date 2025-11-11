import React, { useState, useEffect } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const TodoList: React.FC<{
  setIsLoading: (value: boolean) => void;
  setSelectedTodo: (value: Todo) => void;
  search: string;
  status: string;
  selectedTodo: Todo | null;
}> = ({ setIsLoading, setSelectedTodo, search, status, selectedTodo }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodoList)
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setTodoList]);

  const filteredTodos = todoList
    .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    });

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
        {filteredTodos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {' '}
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                      'fa-eye': selectedTodo?.id !== todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
