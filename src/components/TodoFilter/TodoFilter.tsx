import {
  ChangeEvent,
  FC,
  memo,
} from 'react';

interface TodoFilterProps {
  changeQuery: (query: string) => void;
  changeOption: (option: string) => void;
  selectedOption: string,
  query: string,
}

export const TodoFilter: FC<TodoFilterProps> = memo(({
  changeQuery, changeOption, selectedOption, query,
}) => {
  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  const handleChangeStatus = ((event: ChangeEvent<HTMLSelectElement>) => {
    changeOption(event.target.value);
  });

  const handleChangeClearButton = () => {
    changeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleChangeStatus}
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
          onChange={handleChangeSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          { query !== ''
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleChangeClearButton}
              />
            )}
        </span>
      </p>
    </form>
  );
});
