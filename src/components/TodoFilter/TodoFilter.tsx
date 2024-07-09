import { useContext } from 'react';
import { DispatchContext, StatesContext } from '../Context/GlobalStateProvider';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { query, todos } = useContext(StatesContext);
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setQuery', payload: event.target.value.trim() });
    dispatch({
      type: 'filterTodos',
      payload:
        query.length > 0
          ? todos.filter(todo => todo.title.includes(query))
          : todos,
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect">
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
