import { ChangeEvent } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

interface Props {
  query: string;
  handleSetQuery: (arg: string) => void;
  filter: Todo[];
  handleSetType: (arg: Filter) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  handleSetQuery,
  handleSetType,
}) => {
  const handlechange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetType(event.currentTarget.value as Filter);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSetQuery(event.target.value);
  };

  const clearQuery = () => {
    handleSetQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlechange}
            defaultValue={Filter.ALL}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearQuery}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
