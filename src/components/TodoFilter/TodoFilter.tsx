/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { FilterParams } from '../../types/filterParams';
import { TodosContext } from '../Store/Store';
import { getFilteredTodos } from '../../services/getfilteredTodos';

export const TodoFilter = () => {
  const {
    todos,
    setFilteredTodos,
  } = useContext(TodosContext);

  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(FilterParams.All);

  const filteredTodos = getFilteredTodos(todos, filter, title);

  useEffect(() => {
    setFilteredTodos(filteredTodos);
  }, [filter, title]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.toLowerCase());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterParams)}
          >
            <option value={FilterParams.All}>
              All
            </option>

            <option value={FilterParams.Active}>
              Active
            </option>

            <option value={FilterParams.Completed}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={title}
          onChange={handleTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {title && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
