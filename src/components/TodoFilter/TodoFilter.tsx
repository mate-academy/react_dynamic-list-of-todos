import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { flterByTypes } from '../../utils/FilterTypes';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
  filterTodos: (filterTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, filterTodos }) => {
  const [filteredType, setFilteredType] = useState(FilterType.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    filterTodos(flterByTypes(filteredType, todos, query));
  }, [todos, filteredType, query, filterTodos]);

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredType(event.target.value as unknown as FilterType);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeOption}>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
