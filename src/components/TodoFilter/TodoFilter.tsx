import { FC, useState } from 'react';

interface Props {
  optionForFilter: string,
  setOptionForFilter: (optionForFilter: string) => void,
  setQuery: (query: string) => void,
}

export const TodoFilter: FC<Props> = (props) => {
  const [displayedDeleteButton, setDisplayedDeleteButton] = useState(false);
  const { optionForFilter, setOptionForFilter, setQuery } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={optionForFilter}
            onChange={(event => setOptionForFilter(event.target.value))}
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
          onChange={(event) => {
            setQuery(event.target.value);
            setDisplayedDeleteButton(true);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {displayedDeleteButton && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
