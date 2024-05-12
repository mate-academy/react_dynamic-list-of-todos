import React from 'react';
import { FilterField } from '../../tools/constants';

type Props = {
  title: string;
  setFilterField: (filterField: string) => void;
  setTitle: (title: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  title,
  setFilterField,
  setTitle,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => setFilterField(event.target.value)}
        >
          {Object.values(FilterField).map((field: FilterField) => (
            <option key={field} value={field}>
              {field[0].toUpperCase() + field.slice(1).toLowerCase()}
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
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {title !== '' && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setTitle('')}
          />
        )}
      </span>
    </p>
  </form>
);
