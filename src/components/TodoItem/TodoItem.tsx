import { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [openTodoModal, setOpenTodoModal] = useState(false);

  return (
    <>
      <tr
        data-cy="todo"
        className={classNames(
          { 'has-background-info-light': openTodoModal },
        )}
      >
        <td className="is-vcentered">{todo.id}</td>

        <td className="is-vcentered">
          {todo.completed
            && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
        </td>

        <td className="is-vcentered is-expanded">
          <p className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
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
            onClick={() => setOpenTodoModal(true)}
          >
            <span className="icon">
              <i className={
                classNames('far',
                  { 'fa-eye': !openTodoModal },
                  { 'fa-eye-slash': openTodoModal })
              }
              />
            </span>
          </button>
        </td>
      </tr>

      {openTodoModal
        && <TodoModal todo={todo} modalClose={setOpenTodoModal} />}
    </>
  );
};
