import React, { Dispatch, SetStateAction, useState } from 'react';
import { Filter } from '../../types/Todo';

type Props = {
  filter: Filter,
  setFilter: Dispatch<SetStateAction<Filter>>;
  setSearchText: Dispatch<SetStateAction<string>>,
  searchText: string,
};
export const TodoFilter: React.FC<Props> = ({
  filter, setFilter, setSearchText, searchText,
}) => {
  const [isClear, setIsClear] = useState(false);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
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
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (e.target.value !== '') {
              setIsClear(true);
            } else {
              setIsClear(false);
            }
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {isClear && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchText('');
                setIsClear(false);
              }}
              aria-label="Clear Search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
