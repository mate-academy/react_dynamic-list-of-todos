import React from 'react';

type Props = {
  text: string;
  setText: (text: string) => void;
  option: string;
  setOption: (text: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  text,
  setText,
  option,
  setOption,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={option}
          onChange={e => setOption(e.target.value)}
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
        onChange={e => setText(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {text && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setText('')}
          />
        )}
      </span>
    </p>
  </form>
);
