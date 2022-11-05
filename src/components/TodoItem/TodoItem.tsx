import { FC, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserContext } from '../UserContext';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    id, title, completed, userId,
  } = todo;

  const {
    selectedTodoId,
    selectCurrentTodo,
  } = useContext(UserContext);
  const isSelected = selectedTodoId === id;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
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
        <p
          className={classNames({
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
          onClick={() => selectCurrentTodo(id, userId)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
