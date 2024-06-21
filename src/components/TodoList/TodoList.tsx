import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedIdTodo: number | undefined;
  onSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo,
  selectedIdTodo,
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
      {todos.map(todo => {
        const { id, title, completed } = todo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedIdTodo === id,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectedTodo(todo)}
              >
                {todo && (
                  <span className="icon">
                    <i
                      className={cn({
                        'far fa-eye-slash': selectedIdTodo === id,
                        'far fa-eye': selectedIdTodo !== id,
                      })}
                    />
                  </span>
                )}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
