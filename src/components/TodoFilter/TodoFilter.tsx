import React, { ChangeEvent } from 'react';
import { StatusFilter } from '../../helpers/StatusFilter';

type Props = {
  inputValue: string,
  setInputValue: (input: React.SetStateAction<string>) => void,
  setTodoFilter: (status: React.SetStateAction<StatusFilter>) => void,
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  setInputValue,
  setTodoFilter,
}) => {
  const handleClearinput = () => {
    setInputValue('');
  };

  const changeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setTodoFilter(event.target.value as StatusFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={changeFilter}
          >
            <option value={StatusFilter.All}>All</option>
            <option value={StatusFilter.ACTIVE}>Active</option>
            <option value={StatusFilter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearinput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
