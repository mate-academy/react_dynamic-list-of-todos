import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string,
  text:string,
  setValue: Dispatch<SetStateAction<string>>,
  setText: Dispatch<SetStateAction<string>>,
};

export const TodoFilter: React.FC<Props> = ({
  value,
  setValue,
  text,
  setText,
}) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={onSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
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
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {!!text.length && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
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
};
