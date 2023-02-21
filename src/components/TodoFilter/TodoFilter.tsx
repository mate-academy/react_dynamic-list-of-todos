import React, {
  ChangeEvent,
  useContext,
  useState,
} from 'react';
import { Select } from '../../types/Select';
import { TodosContext } from '../TodosProvider';

export const TodoFilter: React.FC = React.memo(() => {
  const [query, setQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState(Select.all.toString());

  const {
    filterTodosBySearch,
    filterTodosBySelect,
  } = useContext(TodosContext);

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    filterTodosBySearch(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    filterTodosBySearch('');
  };

  const changeSelectedValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    filterTodosBySelect(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedValue}
            onChange={changeSelectedValue}
          >
            <option value={Select.all}>All</option>
            <option value={Select.active}>Active</option>
            <option value={Select.completed}>Completed</option>
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
          onChange={changeQuery}
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
});
