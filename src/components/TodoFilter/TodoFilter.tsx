import React from 'react';

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  isCompleted: string;
  setIsCompleted: (todoStatus: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  searchQuery,
  setSearchQuery,
  isCompleted,
  setIsCompleted,
}) => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const preparedSearchQuery = event.target.value.toLowerCase().trim();

    setSearchQuery(preparedSearchQuery);
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setIsCompleted(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handleFormSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={isCompleted}
            onChange={handleSelect}
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
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery !== ''
              && (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  data-cy="clearSearchButton"
                  type="button"
                  className="delete"
                  onClick={handleClear}
                />
              )}
        </span>
      </p>
    </form>

  );
});
