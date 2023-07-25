import { FilteredFields } from '../../types/FilteredFields';

type Props = {
  query: string;
  onChangeInput: (str: string) => void;
  filteredField: FilteredFields | string;
  onChangeSelect: (field: string) => void;
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    onChangeInput,
    filteredField,
    onChangeSelect,
  },
) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(event.target.value);
  };

  const resetHandler = () => onChangeInput('');

  const onChangeSelectHandler
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      return onChangeSelect(event.target.value);
    };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredField}
            onChange={onChangeSelectHandler}
          >
            <option value={FilteredFields.All}>All</option>
            <option value={FilteredFields.Active}>Active</option>
            <option value={FilteredFields.Completed}>Completed</option>
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
          onChange={inputHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetHandler}
            />
          </span>
        )}

      </p>
    </form>
  );
};
