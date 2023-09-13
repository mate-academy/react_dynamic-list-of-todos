type Props = {
  selectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  selectInputFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedFilter: 'all' | 'active' | 'completed';
  selectedInpputFilter: string;
  onClickHandle: () => void;
};

export const TodoFilter = ({
  selectFilter,
  selectInputFilter,
  selectedFilter,
  selectedInpputFilter,
  onClickHandle,
}: Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={selectFilter}
          value={selectedFilter}
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
        onChange={selectInputFilter}
        value={selectedInpputFilter}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {selectedInpputFilter.length > 0 && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClickHandle}
          />

        )}
      </span>
    </p>
  </form>
);
