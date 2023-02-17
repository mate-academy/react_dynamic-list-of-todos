import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filter: (value: string) => void | Todo[];
  query: (value: string) => void | Todo[];
};

export const TodoFilter: React.FC<Props> = ({ filter, query }) => {
  const [value, setValue] = useState('');

  const queryFilter = (targetValue: string) => {
    query(targetValue.trim().toLowerCase());
    setValue(targetValue);
  };

  const clearSearchButton = () => {
    query('');
    setValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              filter(e.target.value);
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
          placeholder="Search..."
          value={value}
          onChange={(e) => queryFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
