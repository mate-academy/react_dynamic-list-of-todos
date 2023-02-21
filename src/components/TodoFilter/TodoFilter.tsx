import React from 'react';

type Props = {
  inputState: string
  setInputState: (inputState: string) => void
  setToggleFilter: (toggleFilter: boolean | null) => void
};

const Select: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => (
  <span className="select">
    <select
      data-cy="statusSelect"
      onChange={e => onChange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </span>
);

export const TodoFilter: React.FC<Props> = ({
  inputState,
  setInputState,
  setToggleFilter,
}) => (
  <form className="field has-addons" onSubmit={e => e.preventDefault()}>
    <p className="control">
      <Select onChange={value => {
        switch (value) {
          case 'active':
            setToggleFilter(false);
            break;

          case 'completed':
            setToggleFilter(true);
            break;

          default:
            setToggleFilter(null);
            break;
        }
      }}
      />
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={inputState}
        onChange={event => setInputState(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputState && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setInputState('')}
          />
        </span>
      )}

    </p>
  </form>
);
