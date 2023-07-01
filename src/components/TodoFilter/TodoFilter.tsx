import { ChangeEvent } from 'react';
import { FilterTodos } from '../../types/FilterTodos';

type Props = {
  query: string,
  handleQuery: (search: string) => void,
  handleStatus: (status: FilterTodos) => void,
  handleEraseInput: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleQuery,
  handleStatus,
  handleEraseInput,
}) => {
  const handleSelectStatus = (e:ChangeEvent<HTMLSelectElement>) => {
    handleStatus(e.target.value as FilterTodos);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectStatus}
          >
            <option value={FilterTodos.ALL}>All</option>
            <option value={FilterTodos.ACTIVE}>Active</option>
            <option value={FilterTodos.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleEraseInput}
              aria-label="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
