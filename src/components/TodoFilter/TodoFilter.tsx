import { useState } from 'react';
import { getFalseComplite, getTodosAll, getTrueComplite } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: (todos: Todo[]) => void;
  setQuery: (str: string) => void;
  query: string;
};

enum Category {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoFilter: React.FC<Props> = ({ setTodos, setQuery, query }) => {
  const [category, setCategory] = useState(Category.All);

  const onCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value as Category;

    setCategory(selectedCategory);

    switch (selectedCategory) {
      case Category.All:
        return getTodosAll().then(setTodos);
      case Category.Active:
        return getFalseComplite().then(setTodos);
      case Category.Completed:
        return getTrueComplite().then(setTodos);
      default:
        return;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={category}
            onChange={onCategorySelect}
          >
            <option value={Category.All}>All</option>
            <option value={Category.Active}>Active</option>
            <option value={Category.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
