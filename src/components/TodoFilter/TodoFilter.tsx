import { ChangeEvent } from 'react';

type Props = {
  selectFilter: string;
  query: string;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectFilter,
  query,
  onSelect,
  onInput,
  onDelete,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={onSelect} value={selectFilter}>
          {['All', 'Active', 'Completed'].map(opt => (
            <option value={opt.toLowerCase()} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={onInput}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onDelete}
          />
        )}
      </span>
    </p>
  </form>
);
