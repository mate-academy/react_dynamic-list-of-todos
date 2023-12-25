import { useContext } from 'react';
import { TodosContext } from '../../services/Store';
import { ConditionFilter } from '../../types/conditionFilter';

export const TodoFilter = () => {
  const {
    titleFilter,
    setTitleFilter,
    setConditionFilter,
  } = useContext(TodosContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(event.target.value.toLocaleLowerCase());
  };

  const changeFilterOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setConditionFilter(value as ConditionFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={changeFilterOption}>
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
          value={titleFilter}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {titleFilter.length > 0 && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitleFilter('')}
            />
          )}

        </span>
      </p>
    </form>
  );
};
