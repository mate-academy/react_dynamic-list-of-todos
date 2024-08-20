import React, { useContext, useState } from 'react';
import { FilteredTodosContext, TitileContext, TodosContext } from '../../store';

export const TodoFilter: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const { title, setTitle } = useContext(TitileContext);
  const [option, setOption] = useState('ALL');

  const { dispatch } = useContext(FilteredTodosContext);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    dispatch({ type: selectedOption.toUpperCase(), allTodos: todos });
    setOption(selectedOption.toUpperCase());

    if (title) {
      dispatch({ type: 'SEARCH', payload: title });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    dispatch({ type: option, allTodos: todos });
    if (event.currentTarget.value) {
      dispatch({ type: 'SEARCH', payload: event.currentTarget.value });
    }
  };

  const clearSerch = () => {
    setTitle('');
    dispatch({ type: option, allTodos: todos });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleOptionChange}>
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
          value={title}
          onChange={handleTitleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {title && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }
            }>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSerch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
