import React from 'react';

type Props = {
  setSortFilter: (filter: string) => void;
  sortFilter: string;
  setSortText: (text:string) => void;
  sortText: string;

};

export const TodoFilter:React.FC<Props> = ({
  setSortFilter,
  sortFilter,
  setSortText,
  sortText,
}) => {
  const handleoChangeValue
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortFilter(event.currentTarget.value);
    };

  const handleChangeText
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSortText(event.currentTarget.value);
    };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortFilter}
            onChange={handleoChangeValue}
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
          value={sortText}
          placeholder="Search..."
          onChange={handleChangeText}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!sortText
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="clear Filter Text"
                onClick={() => setSortText('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
