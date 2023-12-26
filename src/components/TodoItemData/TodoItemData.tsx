import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoItemData: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <>
      <td className="is-vcentered">{id}</td>

      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames('',
          { 'has-text-danger': !completed },
          { 'has-text-success': completed })}
        >
          {title}
        </p>
      </td>
    </>
  );
};
