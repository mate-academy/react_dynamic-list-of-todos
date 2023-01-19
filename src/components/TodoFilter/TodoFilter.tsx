import { FC } from 'react';

type Props = {
  onInputUpdate: (input: string) => void,
  onInputClear: () => void,
  onSelect: (option: string) => void,
  input: string,
};

export const TodoFilter:FC<Props> = ({
  onSelect,
  onInputUpdate,
  onInputClear,
  input,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelect(event.currentTarget.value)}
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
        value={input}
        onChange={event => onInputUpdate(event.currentTarget.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {input && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            aria-label="Clear search"
            type="button"
            className="delete"
            onClick={onInputClear}
          />
        </span>
      )}
    </p>
  </form>
);
