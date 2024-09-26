import { Filter } from '../../types/Filter';

type Props = {
  setFilter: (filter: Filter) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter = () => {},
  setSearchValue = () => {},
  searchValue = '',
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            <option value={Filter.All}>{Filter.All}</option>
            <option value={Filter.Active}>{Filter.Active}</option>
            <option value={Filter.Completed}>{Filter.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
