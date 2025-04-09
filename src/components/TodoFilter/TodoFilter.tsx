import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
// import debounce from 'debounce';
import { debounce } from 'lodash';

type Props = {
  todoData: Todo[] | null;
  setPreparedData: React.Dispatch<React.SetStateAction<Todo[] | null>>;
};

export const TodoFilter: React.FC<Props> = ({ todoData, setPreparedData }) => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filteredBy, setFilteredBy] = useState('all');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, 200), []);

  const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(changeEvent.target.value);
    applyQuery(changeEvent.target.value);
  };

  useEffect(() => {
    if (!todoData) {
      return;
    }

    let filteredData = todoData.filter(todo =>
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase().trim()),
    );

    if (filteredBy === 'active') {
      filteredData = filteredData.filter(item => item.completed === false);
    } else if (filteredBy === 'completed') {
      filteredData = filteredData.filter(item => item.completed === true);
    }

    setPreparedData(filteredData);
  }, [appliedQuery, filteredBy, setPreparedData, todoData]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredBy}
            onChange={e => {
              setFilteredBy(e.target.value);
            }}
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
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {appliedQuery !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                setAppliedQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
