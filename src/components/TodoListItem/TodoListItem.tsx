import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodoId?: Todo['id'];
  onOpenModal: (todo: Todo) => void;
}

export const TodoListItem = ({ todo, selectedTodoId, onOpenModal }: Props) => {
  const { id, completed, title } = todo;
  const isSelected = id === selectedTodoId;

  return (
    <tr
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
            'has-text-success': completed,
            'has-text-danger': !completed,
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
          onClick={() => onOpenModal(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isSelected,
                'fa-eye': !isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
