import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type PropsTodoList = {
  todos: Todo[];
  handleShowTodo: (todo: Todo) => void;
  activeTodo?: Todo | null;
  inputValue?: string;
};

export const TodoList: React.FC<PropsTodoList> = ({
  todos,
  handleShowTodo,
  activeTodo,
  inputValue,
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
        {todos
          .filter(todo => {
            if (!inputValue) {
              return todo;
            } else {
              return todo.title
                .toLowerCase()
                .includes(inputValue?.toLowerCase());
            }
          })
          .map(todo => {
            const { completed, id, title } = todo;

            return (
              <tr data-cy="todo" className="" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td
                  className={classNames('is-vcentered ', {
                    'is-expanded': completed,
                  })}
                >
                  <p
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleShowTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === activeTodo?.id
                            ? 'far fa-eye-slash'
                            : ' far  fa-eye'
                        }
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
