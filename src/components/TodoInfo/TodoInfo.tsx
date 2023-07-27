import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppContext } from '../Context/AppContext';

type Props = {
  todo: Todo,
};

const TodoInfo = ({ todo }: Props) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const {
    selectedTodoId,
    setSelectedTodoId,
    setModalLoader,
  } = useAppContext();

  return (
    <tr
      data-cy="todo"
      key={id}
      className={cn({
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
        <p className={cn({
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
          onClick={() => {
            setSelectedTodoId(id);
            setModalLoader(true);
          }}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': selectedTodoId !== id,
              'fa-eye-slash': selectedTodoId === id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoInfo;
