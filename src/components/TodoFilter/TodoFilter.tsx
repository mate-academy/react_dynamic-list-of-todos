import debounce from 'lodash.debounce';
import { useCallback, useContext, useState } from 'react';
import {
  ACTIONS,
  DispatchContext,
} from '../ToDoContext';

export const TodoFilter = () => {
  const [input, setInput] = useState('');
  const dispatch = useContext(DispatchContext);

  function onSelectHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: ACTIONS.SORT, payload: e.target.value });
  }

  function setDelayedInput(value: string) {
    dispatch({ type: ACTIONS.SET_SEARCH_VALUE, payload: value.toLowerCase() });
  }

  const applyDelayedInput = useCallback(debounce(setDelayedInput, 1000), []);

  function inputSearchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    applyDelayedInput(e.target.value.toLowerCase());
  }

  function clearInput() {
    setInput('');
    setDelayedInput('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={(e) => onSelectHandler(e)}>
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
          value={input}
          className="input"
          placeholder="Search..."
          onChange={(e) => inputSearchHandler(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {input.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
