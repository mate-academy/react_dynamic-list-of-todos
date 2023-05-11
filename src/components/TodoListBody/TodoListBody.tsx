import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoClick: (todo: Todo) => void;
}

export const TodoListBody: React.FC<Props> = ({
  todos,
  onTodoClick,
  selectedTodo,
}) => (
  <tbody>
    {todos.map((todo) => (
      <tr
        data-cy="todo"
        className={classNames({
          'has-background-info-light': selectedTodo === todo,
        })}
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
          <p className={classNames({
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
            onClick={() => onTodoClick(todo)}
          >
            <span className="icon">
              <i className={classNames({
                'far fa-eye': selectedTodo !== todo,
                'far fa-eye-slash': selectedTodo === todo,
              })}
              />
            </span>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);
