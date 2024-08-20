import { FilterStatusType } from '../../types/Todo';

type Props = {
  setFilterLetter: (letter: string) => void;
  setFilterStatus: (status: FilterStatusType) => void;
  filterLetter: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterLetter,
  setFilterStatus,
  filterLetter,
}) => {
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLetter(event.target.value);
  };

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as FilterStatusType);
  };

  const handlClearButton = () => {
    setFilterLetter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectFilter}>
            <option value="All">{FilterStatusType.All}</option>
            <option value="Active">{FilterStatusType.Active}</option>
            <option value="Completed">{FilterStatusType.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChangeFilter}
          value={filterLetter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filterLetter !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handlClearButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
