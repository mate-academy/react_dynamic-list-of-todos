import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoSelect,
  selectedTodo,
}) => {
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
        {todos.map(todo => {
          const isSelect = selectedTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={
                selectedTodo?.id === todo.id
                  ? 'has-background-info-light'
                  : 'has-background-info-white'
              }
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span data-cy="iconCompleted" className="icon">
                    <i data-cy="todoStatus" className="fas fa-check" />
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
                  onClick={() => onTodoSelect(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': isSelect,
                        'fa-eye': !isSelect,
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
