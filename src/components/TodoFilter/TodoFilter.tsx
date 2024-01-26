import debounce from 'lodash.debounce';
import {
  useContext, useEffect, useState,
} from 'react';

import { TodosContext } from '../../context/TodosContext';
import { Filter } from '../../types/Filter';

export const TodoFilter = () => {
  const { setFilter } = useContext(TodosContext);

  const [selectInp, setSelectInp] = useState('all');
  const [change, setChange] = useState('');
  const [appliedValue, setAppliedValue] = useState('');

  useEffect(() => {
    setFilter((prevState: Filter) => ({
      ...prevState,
      select: selectInp,
      input: appliedValue,
    }));
  }, [selectInp, appliedValue, setFilter]);

  const handleDebouncedChange = debounce((inputValue: string) => {
    setAppliedValue(inputValue);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setChange(inputValue);

    handleDebouncedChange(inputValue);
  };

  const handleDelite = () => {
    setChange('');

    setFilter((prevState: Filter) => ({
      ...prevState,
      input: '',
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setSelectInp(event.target.value)}
            value={selectInp}
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
          onChange={handleChange}
          value={change}
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
            onClick={handleDelite}
          />
        </span>
      </p>
    </form>
  );
};
