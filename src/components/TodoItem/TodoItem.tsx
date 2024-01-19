import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../State/State';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { title, id, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        <span className="icon" data-cy="iconCompleted">
          {completed && <i className="fas fa-check" />}
        </span>
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={completed ? 'has-text-success' : 'has-text-danger'}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch({ type: 'getSelectedTodo', payload: todo })}
        >
          <span className="icon">
            {/* <i className="far fa-eye-slash" /> */}
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
