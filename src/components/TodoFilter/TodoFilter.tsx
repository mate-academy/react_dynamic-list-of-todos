import { useState, useEffect } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type TodoFilterProps = {
  initialTodos: Todo[] | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  initialTodos,
  setTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filterParam, setFilterParam] = useState(Filter.All);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (initialTodos !== null) {
      switch (event.target.value) {
        case Filter.Active:
          setFilterParam(Filter.Active);
          break;
        case Filter.Completed:
          setFilterParam(Filter.Completed);
          break;
        default:
          setFilterParam(Filter.All);
          break;
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const applyFilters = () => {
    let todos: Todo[] | [] = [];

    if (initialTodos !== null) {
      todos = [...initialTodos];
    }

    switch (filterParam) {
      case Filter.Active:
        todos = todos.filter(todo => !todo.completed);
        break;
      case Filter.Completed:
        todos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (initialTodos !== null) {
      setTodos(todos.filter(todo => (
        todo.title.trim().toLowerCase().includes(query.trim().toLowerCase())
      )));
    }
  };

  const deleteQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    applyFilters();
  }, [query, filterParam]);

  return (
    <form
      className="field has-addons"
      onSubmit={handleSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilter}
          >
            <option
              value="all"
            >
              {Filter.All}
            </option>
            <option
              value="active"
            >
              {Filter.Active}
            </option>
            <option
              value="completed"
            >
              {Filter.Completed}
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
          onChange={handleSearch}
          value={query}
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
              onClick={deleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
