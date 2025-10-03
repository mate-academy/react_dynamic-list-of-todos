import React, { useState } from 'react';
import { TodoStatus } from '../../types/Todo';

type Props = {
  onSelect: (method: TodoStatus) => void;
  onQueryChange: (query: string) => void;
};

const TodoFilter: React.FC<Props> = ({ onSelect, onQueryChange }: Props) => {
  /* It's important to store the query in state because I need to
  use it as the value inside the input tag. Otherwise, after resetting
  the query, the input field won't be cleared. I could manually update
  it using a ref or direct DOM manipulation, but in my opinion,
  using state is easier. */
  const [query, setQuery] = useState('');

  const handleQueryChange = (value: string) => {
    setQuery(value);
    onQueryChange(value);
  };

  const clearQuery = () => {
    setQuery('');
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onSelect(event.target.value as TodoStatus)}
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
          onChange={event => handleQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export default React.memo(TodoFilter);
