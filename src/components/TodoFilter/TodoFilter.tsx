import { FC } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { getEnumKeys } from '../../helpers/getEnumKeys';
import { FilterOptions } from '../../types/filterOptions';

interface TodoFilterProps {
  onChangeFormState: (key: string, value: string | TodoStatus) => void,
  formState: FilterOptions
}

export const TodoFilter: FC<TodoFilterProps> = (props) => {
  const { onChangeFormState, formState } = props;

  const statusKeys = getEnumKeys(TodoStatus);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={formState.todoStatus}
            onChange={(event) => (onChangeFormState(
              'todoStatus',
              event.target.value,
            ))}
          >
            {statusKeys.map((key) => (
              <option
                key={key}
                value={TodoStatus[key]}
              >
                {key}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={formState.searchQuery}
          onChange={(event) => onChangeFormState(
            'searchQuery',
            event.target.value,
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {formState.searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeFormState('searchQuery', '')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
