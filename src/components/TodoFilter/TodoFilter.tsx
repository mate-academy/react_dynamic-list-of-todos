import classNames from 'classnames';
import React from 'react';
import { Field } from '../../types/FilterField';

type Props = {
  query: string;
  onChangeStatus: (newStatus: string) => void;
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeStatus,
  onChangeQuery,
  onReset,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onChangeStatus(event.target.value)}
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
        value={query}
        onChange={onChangeQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span
          className={classNames('icon is-right', { pointerEvents: Field.All })}
        >
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onReset}
          />
        </span>
      )}
    </p>
  </form>
);
