import React, {
  ChangeEvent, Dispatch, SetStateAction,
} from 'react';
import { FilterEnum } from '../../types/filter';

type Props = {
  filter: FilterEnum,
  setFilter: Dispatch<SetStateAction<FilterEnum>>;
  query: string,
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter, filter, setQuery, query,
}) => {
  const handleChangeOptions
    = (event: ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value as FilterEnum);
    };

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteTodo = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleChangeOptions}
          >
            <option value={FilterEnum.all}>All</option>
            <option value={FilterEnum.active}>Active</option>
            <option value={FilterEnum.completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {Boolean(query)
          && (
            <span className="icon is-right delete-icon">
              <button
                aria-label="delete"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleDeleteTodo}
              />
            </span>
          )}
      </p>
    </form>
  );
};
