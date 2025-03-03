import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
  startTodos: Todo[];
};

export const TodoFilter: React.FC<Props> = ({ setTodos, startTodos }) => {
  const [inputFilter, setInputFilter] = useState('');
  const [select, setSelect] = useState('all');

  function handleFilter(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    if (event.target instanceof HTMLInputElement) {
      setInputFilter(event.target.value);
    } else if (event.target instanceof HTMLSelectElement) {
      setSelect(event.target.value);
    }
  }

  useEffect(() => {
    let filteredTodos = [...startTodos];

    if (inputFilter) {
      filteredTodos = filteredTodos.filter(item =>
        item.title.toLowerCase().includes(inputFilter.toLowerCase()),
      );
    }

    if (select === 'active') {
      filteredTodos = filteredTodos.filter(item => !item.completed);
    } else if (select === 'completed') {
      filteredTodos = filteredTodos.filter(item => item.completed);
    }

    setTodos(filteredTodos);
  }, [inputFilter, select, startTodos, setTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={ev => handleFilter(ev)}>
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
          value={inputFilter}
          onChange={ev => {
            handleFilter(ev);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputFilter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputFilter('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
