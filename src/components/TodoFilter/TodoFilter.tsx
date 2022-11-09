import { FC } from 'react';
import { FilteringMethod } from '../../types/FilteringMethod';

interface Prop {
  searchField: string;
  setSearchField: (searchField : string) => void;
  setFilteringMethod: (value: FilteringMethod) => void;
}

export const TodoFilter: FC<Prop> = ({
  searchField,
  setSearchField,
  setFilteringMethod,
}) => {
  const handleFilteringSelection = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case FilteringMethod.Completed:
        setFilteringMethod(FilteringMethod.Completed);
        break;

      case FilteringMethod.Active:
        setFilteringMethod(FilteringMethod.Active);
        break;

      default:
        setFilteringMethod(FilteringMethod.All);
        break;
    }
  };

  const resetSearchField = () => {
    setSearchField('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilteringSelection}
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
          className="input"
          type="text"
          value={searchField}
          onChange={event => setSearchField(event.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchField
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetSearchField}
            />
          </span>
        )}
      </p>
    </form>
  );
};
