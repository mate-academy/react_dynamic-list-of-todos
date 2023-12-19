import { Filter } from '../../enum/Filter';

type Props = {
  setFilter: (value: Filter) => void;
  setInputQuery: (value: string) => void;
  inputQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  setInputQuery,
  inputQuery,
}) => {
  const filterTodos = (e:React.MouseEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value as Filter);
  };

  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onClick={filterTodos}
          >
            <option
              value="all"
            >
              All
            </option>
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
          value={inputQuery}
          onChange={searchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {inputQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
