import React, { useState } from 'react';

type FilterFunction = {
  filterList: (search: string) => void;
  filterlistBySelectElem: (search: string) => void;
};

export const TodoFilter: React.FC<FilterFunction> = ({
  filterList,
  filterlistBySelectElem,
}) => {
  const [searchItem, setSearchItem] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    setSearchItem(searchValue);
    filterList(searchValue);
  };

  const handelSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const searchValue = event.target.value;

    setSelectValue(searchValue);
    filterlistBySelectElem(searchValue);
  };

  const resetInput = () => {
    setSearchItem('');
    filterList('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handelSelectChange}
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
          value={searchItem}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchItem.length > 0 && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
