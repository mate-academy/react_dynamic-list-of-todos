import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId?: number;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  return (
    <table className="table is-narrow is-fullwidth" data-cy="todoList">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr key={todo.id} data-cy="todo">
              <td>{todo.id}</td>
              <td
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </td>
              <td>
                {todo.completed && (
                  <span
                    className="icon has-text-success"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td>
                {/* ОСЬ ЦЯ КНОПКА ПОТАЙНА/СИНЯ В ACTION */}
                <button
                  type="button"
                  data-cy="selectButton"
                  className={classNames('button', 'is-link', {
                    'is-outlined': !isSelected,
                  })}
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-eye': !isSelected,
                        'fa-eye-slash': isSelected,
                      })}
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
