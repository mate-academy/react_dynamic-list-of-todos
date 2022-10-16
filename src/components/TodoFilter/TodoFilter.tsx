/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line import/no-cycle
import { FilterBy } from '../../App';

type Props = {
  filterBy: string,
  setFilterBy: (param: FilterBy) => void,
  inputFilter: string,
  setInputFilter: (param: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  inputFilter,
  setInputFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={(event) => setFilterBy(event.target.value as FilterBy)}
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
          value={inputFilter}
          onChange={(event) => setInputFilter(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputFilter && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
