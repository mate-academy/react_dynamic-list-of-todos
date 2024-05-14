import React from "react";
import { AgroupField } from "../../types/AgroupField";

interface Props {
  query: string;
  setQuery: (input: string) => void;
  agroupField: string;
  setAgroupField: (field: AgroupField) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  agroupField,
  setAgroupField
}) => (

  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select 
          data-cy="statusSelect"
          value={agroupField}
          onChange={e => setAgroupField(e.target.value as AgroupField)}
        >
          <option value={AgroupField.ALL}>ALL</option>
          <option value={AgroupField.ACTIVE}>Active</option>
          <option value={AgroupField.COMPLETED}>Completed</option>
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
        onChange={e => setQuery(e.target.value)}
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
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
