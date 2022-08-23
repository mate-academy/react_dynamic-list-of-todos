import { useState } from 'react';

type Props = {
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  setOptions,
  setQuery,
}) => {
  const [search, setSearch] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              setOptions(e.target.value);
            }}
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          search !== ''
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setSearch('');
                }}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
