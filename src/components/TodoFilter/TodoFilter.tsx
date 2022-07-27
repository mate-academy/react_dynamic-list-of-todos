import React, { useState } from 'react';

enum Sort {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  todosInput:(query:string) => void,
  todosSelect:(selectOption:string) => void,

};

export const TodoFilter: React.FC<Props> = ({
  todosSelect,
  todosInput,
}) => {
  const [query, setQuery] = useState('');

  const handleSelect = (event: { target: { value: string } }) => {
    const { value } = event.target;

    todosSelect(value);
  };

  const handleInput = (event: { target: { value: string } }) => {
    const { value } = event.target;

    setQuery(value);
    todosInput(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            <option value={Sort.all}>All</option>
            <option value={Sort.active}>Active</option>
            <option value={Sort.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="filterByTitle"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            onClick={() => {
              setQuery('');
              todosInput('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
