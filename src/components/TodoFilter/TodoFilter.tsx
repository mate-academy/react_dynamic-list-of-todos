import { SortType } from '../../types/FilterTypes';

export type Props = {
  valueInput: string,
  filterType: SortType,
  onChangeInput(str: string): void,
  onChangeFilterType(filterType: string): void,
};

export const TodoFilter: React.FC<Props> = ({
  valueInput,
  filterType,
  onChangeInput,
  onChangeFilterType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={(ev) => onChangeFilterType(ev.target.value)}
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
        value={valueInput}
        onChange={(ev) => onChangeInput(ev.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {valueInput && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeInput('')}
          />
        </span>
      )}
    </p>
  </form>
);
