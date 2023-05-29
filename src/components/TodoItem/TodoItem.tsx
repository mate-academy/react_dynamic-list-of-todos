import cn from 'classnames';

interface Props {
  title: string,
  id: number,
  onTodoSelection: (id: number) => void,
  isSelected: boolean,
  completed: boolean,
}
export const TodoItem: React.FC<Props> = ({
  title,
  id,
  onTodoSelection,
  isSelected,
  completed,
}) => (
  <tr
    data-cy="todo"
    className={cn({
      'has-background-info-light': isSelected,
    })}
    key={id}
  >
    <td className="is-vcentered">{id}</td>
    {completed
      ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      )
      : (
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
        className={cn('button', {
          'is-link': isSelected,
        })}
        type="button"
        onClick={() => onTodoSelection(id)}
      >

        <span className="icon">
          <i className={cn('far', {
            'fa-eye': !isSelected,
            'fa-eye-slash': isSelected,
          })}
          />
        </span>
      </button>
    </td>
  </tr>
);
