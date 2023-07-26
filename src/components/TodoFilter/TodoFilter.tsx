/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState } from 'react';
import { Select } from '../../types/Select';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setFilteredTodos: (todos: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Select>(Select.All);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value as Select);
  };

  useEffect(() => {
    let filteredTodos = todos;
    const normalizedQuery = query.toLowerCase();

    switch (selectedCategory) {
      case Select.Completed:
        filteredTodos = filteredTodos.filter((todo: Todo) => todo.completed);
        break;
      case Select.Active:
        filteredTodos = filteredTodos.filter((todo: Todo) => !todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      filteredTodos = filteredTodos
        .filter((todo: Todo) => todo.title.toLowerCase()
          .includes(normalizedQuery));
    }

    setFilteredTodos(filteredTodos);
  }, [query, selectedCategory]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedCategory}
            onChange={handleSelectChange}
          >
            <option value={`${Select.All}`}>
              All
            </option>
            <option value={`${Select.Active}`}>
              Active
            </option>
            <option value={`${Select.Completed}`}>
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
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
