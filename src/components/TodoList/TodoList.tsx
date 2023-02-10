import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
  setSelectedTodoId: (id: number) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props>
  = ({
    filteredTodos,
    setSelectedTodoId,
    selectedTodoId,
  }) => (
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
        {filteredTodos.map((todo) => (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': selectedTodoId === todo.id },
            )}
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
              <p className={classNames(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodoId(todo.id)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye': todo.id !== selectedTodoId },
                    { 'fa-eye-slash': todo.id === selectedTodoId },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
