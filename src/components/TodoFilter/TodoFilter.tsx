import './TodoFilter.scss';

type Props = {
  onChangeSelect: (option: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeInput: (query: React.ChangeEvent<HTMLInputElement>) => void;
  eraseQuery: () => void;
  filterQuery: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const TodoFilter: React.FC<Props>
  = ({
    onChangeSelect,
    onChangeInput,
    eraseQuery,
    filterQuery,
    handleSubmit,
  }) => {
    return (
      <form className="field has-addons" onSubmit={handleSubmit}>
        <p className="control">
          <span className="select">
            <select data-cy="statusSelect" onChange={onChangeSelect}>
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
            onChange={onChangeInput}
            value={filterQuery}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {filterQuery && (
            <span className="icon is-right isClickable">
              <button
                data-cy="clearSearchButton"
                aria-label="clearSearchButton"
                type="button"
                className="delete"
                onClick={eraseQuery}
              />
            </span>
          )}
        </p>
      </form>
    );
  };
