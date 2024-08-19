import React, { useContext, useState } from "react";
import { FilteredTodosContext, FirtsLoadedContext } from "../../store";

export const TodoFilter: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [option, setOption] = useState('');
  const { setFirtsLoadedPage } = useContext(FirtsLoadedContext);

  const { dispatch } = useContext(FilteredTodosContext);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFirtsLoadedPage(false);
    const selectedValue = event.target.value;

    dispatch({ type: selectedValue.toUpperCase() });
    setOption(selectedValue.toUpperCase())

    if (title) {
      dispatch({ type: 'SEARCH', payload: title })
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirtsLoadedPage(false);
    setTitle(event.currentTarget.value);
    dispatch({ type: option })
    if (event.currentTarget.value) {
      dispatch({ type: 'SEARCH', payload: event.currentTarget.value })
    }
  }

  const clearSerch = () => {
    setFirtsLoadedPage(false);
    setTitle('');
    dispatch({ type: option })
  }

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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearSerch}
          />
        </span>
      </p>
    </form>
  )
}
