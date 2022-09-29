import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: (value: number) => number | void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => {
  const handleSelect = (todo: Todo) => {
    return selectedTodoId === todo.id
      ? selectTodo(0)
      : selectTodo(todo.id);
  };

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
        {todos.map((todo) => {
          const { id, completed, title } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodoId === id,
              })}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  'has-text-success',
                  { 'has-text-danger': !completed },
                )}
                >
                  {title}

                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelect(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far fa-eye',
                      { 'far fa-eye-slash': selectedTodoId === id },
                    )}
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
