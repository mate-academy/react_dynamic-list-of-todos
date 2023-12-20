import { Filter } from '../../types/Filter';

type Props = {
  selectValue: string;
  onSelect: (str: string) => void;
  searchValue: string;
  onSearch: (v: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectValue,
  onSelect = () => { },
  searchValue,
  onSearch = () => { },
}) => {
  const handleSelectFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onSelect(event.target.value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleSelectFilter}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={event => onSearch(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          searchValue && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onSearch('')}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
