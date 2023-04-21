import { ChangeEvent, useState } from 'react';

type Props = {
  setFilter: (todos: string) => void,
  setSearchQuery: (todos: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setSearchQuery }) => {
  const [isClearButton, setIsClearButton] = useState(false);
  const handleFilterTodos = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSerchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchQuery(query);
    setIsClearButton(query.trim() !== '');
  };

  const clearSearchField = () => {
    setSearchQuery('');
    const searchInput = document
      .querySelector('input[data-cy=searchInput]') as HTMLInputElement;

    searchInput.value = '';
    setIsClearButton(false);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterTodos}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleSerchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isClearButton && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchField}
            />
          </span>
        )}

      </p>
    </form>
  );
};
