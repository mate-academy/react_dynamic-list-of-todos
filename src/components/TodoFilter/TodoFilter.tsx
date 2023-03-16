import { ChangeEvent, FormEvent } from 'react';
import { FilterCases } from '../../types/FilterCases';

type TodoFilterProps = {
  onSelectUpdate: (value: FilterCases) => void;
  onQueryUpdate: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onSelectUpdate,
  onQueryUpdate,
  query,
}) => {
  const getFilterCases = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = +e.target.value;

    switch (selectValue) {
      case FilterCases.Active:
        onSelectUpdate(FilterCases.Active);
        break;

      case FilterCases.Completed:
        onSelectUpdate(FilterCases.Completed);
        break;

      default:
        onSelectUpdate(FilterCases.All);
        break;
    }
  };

  const handleQueryUpdate = (e: FormEvent<HTMLInputElement>) => {
    onQueryUpdate(e.currentTarget.value);
  };

  const handleQueryReset = () => {
    onQueryUpdate('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={getFilterCases}
          >
            <option
              value={FilterCases.All}
            >
              All
            </option>

            <option
              value={FilterCases.Active}
            >
              Active
            </option>

            <option
              value={FilterCases.Completed}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
          onInput={handleQueryUpdate}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
