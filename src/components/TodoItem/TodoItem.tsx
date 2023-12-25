import classNames from 'classnames';
import { Todo } from '../../libs/types/Todo';

type Props = {
  item: Todo,
  selectedId?: number,
  onSelect: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({ item, selectedId, onSelect }) => {
  const { id, title, completed } = item;

  const isSelected = selectedId === id;

  const handleSelect = () => {
    onSelect(item);
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">
        {id}
      </td>

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
          { title }
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleSelect}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !isSelected,
              'fa-eye-slash': isSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
