import { Filter } from '../../types/Filter';

type Props = {
  filterByCompleted: string,
  onFilterChange: (a: string) => void,
  filterByTitle: string,
  onFilterByTitleChange: (a: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterByCompleted,
  onFilterChange,
  filterByTitle,
  onFilterByTitleChange,
}) => {
  const handlerChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  const handlerChangeFilterByTitle
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilterByTitleChange(event.target.value);
    };

  const handlerClearFilter = () => {
    onFilterByTitleChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerChangeFilter}
            value={filterByCompleted}
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
          value={filterByTitle}
          onChange={handlerChangeFilterByTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterByTitle && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handlerClearFilter}
            />
          </span>
        )}

      </p>
    </form>
  );
};
