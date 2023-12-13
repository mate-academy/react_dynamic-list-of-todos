import React, { useEffect, useState } from 'react';

import './TodoFilter.scss';
import { filteredTodoList } from '../../helpers';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

type Props = {
  todosList: Todo[],
  onFilter: (todos: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = (props) => {
  const { todosList, onFilter } = props;
  const [query, setQuery] = useState('');

  const [filteredBy, setFilteredBy] = React.useState('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilteredBy = event.target.value;

    setFilteredBy(newFilteredBy);

    const preparedTodoList = filteredTodoList(todosList, newFilteredBy, query);

    onFilter(preparedTodoList);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQueryForm = () => {
    setQuery('');
  };

  useEffect(() => {
    getTodos()
      .then(todos => {
        const preparedTodoList = filteredTodoList(todos, filteredBy, query);

        onFilter(preparedTodoList);
      })
      .catch(error => {
        throw new Error('error', error);
      });
  }, [filteredBy, onFilter, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredBy}
            onChange={handleFilterChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right reset__icon">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQueryForm}
              aria-labelledby="button-label"
            />
          )}
        </span>
      </p>
    </form>
  );
};
