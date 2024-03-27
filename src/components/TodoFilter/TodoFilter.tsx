import React from 'react';
import { SortFields } from '../../types/enum';

type Props = {
  searchValue: string;
  filterField: SortFields;
  onSearchValue: (v: string) => void;
  onChangeFilterField: (f: SortFields) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchValue,
  onSearchValue,
  filterField,
  onChangeFilterField,
}) => {
  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilterField(e.target.value as SortFields);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleChangeFilter}
            value={filterField}
            data-cy="statusSelect"
          >
            <option value={SortFields.All}>{SortFields.All}</option>
            <option value={SortFields.Active}>{SortFields.Active}</option>
            <option value={SortFields.Comleted}>{SortFields.Comleted}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={e => onSearchValue(e.target.value)}
          value={searchValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => onSearchValue('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
