import { useContext } from 'react';
import { Search, TypeFilter } from '../../contexts/SearchProvider';

export const TodoFilter = () => {
  const { value, setValue } = useContext(Search);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e =>
              setValue({ ...value, status: e.target.value as TypeFilter })
            }
            defaultValue={value.status}
          >
            <option value={TypeFilter.ALL}>All</option>
            <option value={TypeFilter.PLANNED}>Active</option>
            <option value={TypeFilter.DONE}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => setValue({ ...value, textValue: e.target.value })}
          value={value.textValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value.textValue.length > 0 && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            onClick={() => setValue({ ...value, textValue: '' })}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
