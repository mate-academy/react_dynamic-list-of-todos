import React from 'react';

type Props = {
  searchItem: string;
  selected: string;
  setSelected: (selected: string) => void;

  handleOnSearchItem: (search: string) => void;
};

const options = [
  {
    value: 'all',
    text: 'All',
  },
  { value: 'active', text: 'Active' },
  {
    value: 'completed',
    text: 'Completed',
  },
];

export const TodoFilter: React.FC<Props> = ({
  searchItem,
  selected,
  setSelected,
  handleOnSearchItem,
}: Props) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={selected}
            onChange={e => setSelected(e.target.value)}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
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
          value={searchItem}
          onChange={e => handleOnSearchItem(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchItem !== '' && (
          <span
            className="icon is-right"
            style={{ pointerEvents: searchItem.trim() ? 'all' : 'none' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleOnSearchItem('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
