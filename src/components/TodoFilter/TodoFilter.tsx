import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';

export const TodoFilter = () => {
  const { setFilterField, setQuery, query } = useContext(TodoContext);
  const clearQuery = () => {
    setQuery('');
  };

  const clearButton = (
    <span className="icon is-right" style={{ pointerEvents: 'all' }}>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="clearSearchButton"
        type="button"
        className="delete"
        onClick={clearQuery}
      />
    </span>
  );

  return (
    <form
      className="field has-addons"
      action="/todos"
      method="POST"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setFilterField(event.target.value)}
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
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && clearButton}
      </p>
    </form>
  );
};
