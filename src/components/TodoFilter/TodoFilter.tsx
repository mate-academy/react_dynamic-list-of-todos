import React from 'react';
import { SortFields } from '../../types/enum';

type Props = {
  searchValue: string;
  filterField: SortFields;
  onSearchValue: (searchValue: string) => void;
  onChangeFilterField: (Filterfield: SortFields) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchValue,
  onSearchValue,
  filterField,
  onChangeFilterField,
}) => {
  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilterField(event.target.value as SortFields);
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
            {Object.values(SortFields).map(field => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
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
          <span className="icon is-right">
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
