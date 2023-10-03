import React, { useState } from 'react';
import { Filter } from '../../types/Filter';
import { TodosStatus } from '../../types/TodosStatus';
import { DEFAULT_FILTER } from '../../constants/constants';

type Props = {
  updateFilter: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ updateFilter }) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<TodosStatus>(TodosStatus.All);

  const handleChangeFilterOption
  = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value as TodosStatus;

    setOption(newOption);
    updateFilter({ option: newOption, query });
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    updateFilter({ option, query: newQuery });
  };

  const handleDeleteQuery = () => {
    setQuery('');
    setOption(TodosStatus.All);
    updateFilter(DEFAULT_FILTER);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={handleChangeFilterOption}
          >
            {Object.keys(TodosStatus).map(key => (
              <option
                key={key}
                value={TodosStatus[key as keyof typeof TodosStatus]}
              >
                {key}
              </option>
            ))}
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

        {Boolean(query)
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleDeleteQuery}
              />
            </span>
          )}
      </p>
    </form>
  );
};
