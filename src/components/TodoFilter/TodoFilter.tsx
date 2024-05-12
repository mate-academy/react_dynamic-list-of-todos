import { Filter } from '../../types/Filter';

type Props = {
  changeFilter: React.Dispatch<Filter>;
  changeSearchQuery: React.Dispatch<string>;
  searchQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  changeFilter,
  changeSearchQuery,
  searchQuery,
}) => {
  function inputHandler(data: string) {
    changeSearchQuery(data);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => changeFilter(e.target.value as Filter)}
          >
            {Object.values(Filter).map(value => {
              return (
                <option value={Filter[value]} key={value}>
                  {value[0].toUpperCase() + value.slice(1)}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={searchQuery}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => inputHandler(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => inputHandler('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
