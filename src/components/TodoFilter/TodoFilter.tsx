import { FC, useState } from 'react';

type Props = {
  search: (value: string) => void;
  selectCompleted: () => void;
  selectActive: () => void;
};

export const TodoFilter:FC<Props> = ({ search, selectCompleted, selectActive }) => {
  const [text, setText] = useState('');
  const [select, setSelect] = useState('all');

  const resetSearch = () => {
    search('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={(event) => {
              setSelect(() => {
                return event.target.value;
              });

              if (event.target.value === 'all') {
                resetSearch();
              }

              if (event.target.value === 'active') {
                selectActive();
              }

              if (event.target.value === 'completed') {
                selectCompleted();
              }
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
            search(event.target.value);
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
                resetSearch();
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
