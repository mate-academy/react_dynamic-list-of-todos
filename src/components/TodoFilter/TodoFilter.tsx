import React, { useContext } from 'react';

import { TodoContext } from '../../context/ContextTodo';

import { ETodoStatus } from '../../types/Todo';

import '../../utils/custom-string-extensions';
import styles from './TodoFilter.module.scss';

export const TodoFilter = () => {
  const {
    inputField,
    setInputField,
    setFilteredBy,
    filteredBy,
  } = useContext(TodoContext);

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredBy(event.currentTarget.value as ETodoStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredBy}
            onChange={handleSelectStatus}
          >
            {Object.values(ETodoStatus).map(el => (
              <option key={el} value={el}>{el.toCapitalize()}</option>
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
          value={inputField}
          onChange={(event) => setInputField(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputField && (
          <span className={`icon is-right ${styles.deleteButton}`}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="delete button"
              className="delete"
              onClick={() => setInputField('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
