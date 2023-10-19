import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../../States/SelectedTodoState';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;
  const [isModalShown, setIsModalShown] = useState(false);

  const { selectedTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setIsModalShown(selectedTodo !== null);
  }, [selectedTodo]);

  const showModal = useCallback(() => {
    dispatch({
      type: 'set',
      payload: { todo },
    });
  }, [dispatch, todo]);

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isModalShown,
      })}
    >
      <td className="is-vcentered">{id}</td>

      {
        !completed
          ? (
            <td className="is-vcentered" />
          )
          : (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )
      }

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
          onClick={() => showModal()}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !isModalShown,
              'fa-eye-slash': isModalShown,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
