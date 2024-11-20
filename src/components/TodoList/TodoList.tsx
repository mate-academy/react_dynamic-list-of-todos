import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelectedTodo,
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
          const isSelectedTodo = selectedTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelectedTodo,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo?.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={`${todo?.completed ? 'has-text-success' : 'has-text-danger'}`}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': !isSelectedTodo,
                        'fa-eye-slash': isSelectedTodo,
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
