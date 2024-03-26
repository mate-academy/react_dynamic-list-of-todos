import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo?: Todo | null;
  onSelectTodo?: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodo, onSelectTodo = () => {} }) => {
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
          {todos.map((todo: Todo) => (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon">
                    <i data-cy="iconCompleted" className="fas fa-check" />
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
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames({
                        'far fa-eye': todo !== selectedTodo,
                        'far fa-eye-slash': todo === selectedTodo,
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
  },
);

TodoList.displayName = 'TodoList';
