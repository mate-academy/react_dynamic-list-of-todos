import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  list: Todo[];
  setFilteredList: (todo: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilteredList, list }) => {
  const [inputValue, setInputValue] = useState('');
  const [optionValue, setOptionValue] = useState('all');

  function handleFilter(e: React.SetStateAction<string>) {
    setInputValue(e);
  }

  function handleOptionValue(e: React.SetStateAction<string>) {
    setOptionValue(e);
  }

  useEffect(() => {
    if (optionValue === 'all') {
      setFilteredList(
        list.filter(el =>
          el.title.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    }

    if (optionValue === 'active') {
      setFilteredList(
        list
          .filter(el => el.completed === false)
          .filter(el =>
            el.title.toLowerCase().includes(inputValue.toLowerCase()),
          ),
      );
    }

    if (optionValue === 'completed') {
      setFilteredList(
        list
          .filter(el => el.completed === true)
          .filter(el =>
            el.title.toLowerCase().includes(inputValue.toLowerCase()),
          ),
      );
    }
  }, [inputValue, list, optionValue, setFilteredList]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => handleOptionValue(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => handleFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
