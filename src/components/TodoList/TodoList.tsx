import { Todo } from '../../types/Todo';
import cN from 'classnames';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

export const TodoList: React.FC<{
  todos: Todo[];
  selectedTodoId: number | null;
  setSelectedTodoId: Dispatch<SetStateAction<number | null>>;
}> = ({ todos, selectedTodoId, setSelectedTodoId }) => {
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
        {todos.map((todo: Todo) => {
          const { id, title, completed } = todo;

          function onClickHandler() {
            setSelectedTodoId(id);
          }

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cN({
                'has-background-info-light': selectedTodoId === id,
              })}
            >
              <td className="is-vcentered">{id}</td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={onClickHandler}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={cN(
                        'far',
                        selectedTodoId !== id ? 'fa-eye' : 'fa-eye-slash',
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
