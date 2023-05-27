import React from 'react';

type Props = {
  input: string,
  status: string,
  onChangeStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClearInput: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  input,
  status,
  onChangeStatus,
  onChangeInput,
  onClearInput,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="color"
            value={status}
            onChange={onChangeStatus}
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
          name="field"
          value={input}
          onChange={onChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {input && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              name="field"
              onClick={onClearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
