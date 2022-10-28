import { FC, useState } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  search: (value: string, select: string) => Todo[] | null;
  setVisibleTodos: (val: Todo[] | null) => void;
};

export const TodoFilter:FC<Props> = ({ search, setVisibleTodos }) => {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState('all');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={(event) => {
              setSelected(event.target.value);
              const todos = search(text, event.target.value);

              setVisibleTodos(todos);
            }}
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
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            const todos = search(event.target.value, selected);

            setVisibleTodos(todos);
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {text.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setText('');
                search('', 'all');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
