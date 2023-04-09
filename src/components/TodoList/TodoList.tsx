import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}) => {
  if (todos.length === 0) {
    return <h2>No todos found</h2>;
  }

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
          const { id, title, completed } = todo;
          const isTodoSelected = selectedTodo?.id === id;

          const handleClick = () => setSelectedTodo(todo);

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isTodoSelected,
              })}
              key={id}
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
                <p className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={handleClick}
                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye': !isTodoSelected,
                      'fa-eye-slash': isTodoSelected,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}

        {/* <tr data-cy="todo" className="has-background-info-light">
        <td className="is-vcentered">2</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">quis ut nam facilis et officia qui</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        </td>
      </tr> */}

      </tbody>
    </table>
  );
};
