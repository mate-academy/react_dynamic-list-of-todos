import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  selectedTodoId?: number;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoSelect,
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
      {todos.map(todo => (
        <tr data-cy="todo" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed ? (
              <i className="fas fa-check" data-cy="iconCompleted" />
            ) : (
              <i className="fas fa-xmark" data-cy="iconActive" />
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">{todo.title}</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onTodoSelect(todo)}
            >
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-eye-slash': selectedTodoId === todo.id,
                    'fa-eye': selectedTodoId !== todo.id,
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
