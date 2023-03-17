import React from 'react';

type Props = {
  searched: string,
  selected: string,
  changeState: (select: string, input: string) => void,
};

export const TodoFilter: React.FC<Props> = (
  { changeState, searched, selected },
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="select"
            data-cy="statusSelect"
            value={selected}
            onChange={
              (event) => changeState(event.target.name, event.target.value)
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="input"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searched}
          onChange={
            (event) => changeState(event.target.name, event.target.value)
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searched.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeState('input', '')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
