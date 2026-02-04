import React, { memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId?: number | null;
}

const TodoListBase: React.FC<Props> = ({ todos, onSelect, selectedTodoId }) => (
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
        <tr
          key={todo.id}
          className={classNames({ 'has-background-light': todo.completed })}
          data-cy="todo"
        >
          <td data-cy="todoId">{todo.id}</td>

          <td>
            {todo.completed && (
              <span className="icon has-text-success" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td
            className={classNames({
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed,
            })}
          >
            {todo.title}
          </td>

          <td>
            <button
              type="button"
              className="button is-small is-info is-outlined"
              data-cy="selectButton"
              onClick={() => onSelect(todo)}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
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

export const TodoList = memo(TodoListBase);
TodoList.displayName = 'TodoList';
