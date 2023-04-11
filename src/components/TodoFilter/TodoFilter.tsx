import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  searchQueryTodo: Todo[],
  handleFilterTodos: (filterType: string) => void,
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoFilter: React.FC<Props> = ({
  searchQueryTodo, handleFilterTodos, setFilteredTodos,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);

    const newlistTodo = searchQueryTodo.filter(todo => todo.title
      .toLowerCase().includes(e.target.value.trim().toLowerCase()));

    setFilteredTodos(newlistTodo);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(
              e: React.ChangeEvent<HTMLSelectElement>,
            ) => handleFilterTodos(e.target.value)}
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchQuery.trim().length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
