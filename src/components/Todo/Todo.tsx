import classNames from 'classnames';

import { Todo as TodoType } from '../../types/Todo';

export type OnSelect = React.Dispatch<React.SetStateAction<number>>;

interface Props {
  todo: TodoType;
  onSelect: (todoId: number) => void;
  isSelected: boolean;
}

export const Todo: React.FC<Props> = ({
  todo,
  onSelect,
  isSelected,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const handleSelect = () => onSelect(id);

  return (
    <tr
      data-cy="todo"
      className={classNames(
        { 'has-background-info-light': isSelected },
      )}
    >
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
        <p className={classNames(
          {
            'has-text-success': completed,
            'has-text-danger': !completed,
          },
        )}
        >
          {title}
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
            <i
              className={classNames(
                'far',
                {
                  'fa-eye-slash': isSelected,
                  'fa-eye': !isSelected,
                },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
