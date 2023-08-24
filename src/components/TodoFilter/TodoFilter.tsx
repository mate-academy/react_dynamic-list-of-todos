import { Selected } from '../../types/index';

type Props = {
  handleChangeSelected: (data: Selected) => void;
  handleChangeQuery: (data: string) => void;
  query: string;
  selected: Selected;
};

export const TodoFilter: React.FC<Props> = ({
  handleChangeSelected,
  handleChangeQuery,
  query,
  selected,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => handleChangeSelected(e.target.value as Selected)}
            value={selected}
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
          value={query}
          onChange={(e) => handleChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
