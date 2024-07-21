import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onClickDetails: (todo: Todo) => void;
  chosedTodo: Todo | null;
};

const TodoInfo = ({ todo, onClickDetails, chosedTodo }: Props) => {
  const { id, completed, title } = todo;

  const handleClickUser = () => {
    onClickDetails(todo);
  };

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClickUser}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                { 'fa-eye': chosedTodo?.id !== id },
                { 'fa-eye-slash': chosedTodo?.id === id },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

// fa-eye-slash "far fa-eye"

export default TodoInfo;
