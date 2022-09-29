import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

enum FilterParam {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[];
  setVisibleTodos: (visibleTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setVisibleTodos,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filterBy, setFilterBy] = useState<string>(FilterParam.All);

  const handleFilterParam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const isMatchSearchText = (title: string) => {
    return title.toLowerCase().includes(searchText.toLowerCase());
  };

  useEffect(() => {
    setVisibleTodos(todos.filter(({ completed, title }) => {
      switch (filterBy) {
        case 'active':
          return !completed && isMatchSearchText(title);

        case 'completed':
          return completed && isMatchSearchText(title);

        default:
          return isMatchSearchText(title);
      }
    }));
  }, [filterBy, searchText]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => handleFilterParam(event)}
            data-cy="statusSelect"
          >
            <option value={FilterParam.All}>
              All
            </option>
            <option value={FilterParam.Active}>
              Active
            </option>
            <option value={FilterParam.Completed}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchText}
          onChange={(event) => handleSearchText(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchText
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearchText('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
