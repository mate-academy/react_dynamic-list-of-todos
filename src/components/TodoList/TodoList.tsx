import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onHandleOpenModal: (todo: Todo) => void;
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onHandleOpenModal = () => {},
  selectedTodo,
}) => {
  return (
    <table
      className="table is-narrow is-fullwidth"
    >
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td
              className="is-vcentered"
            >
              {todo.id}
            </td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  'has-text-success',
                  { 'has-text-danger': !todo.completed },
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onHandleOpenModal(todo);
                }}
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
    </table>
  );
};
