import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilter: (filter: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilter }) => {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSearchInput(inputValue);
  };

  useEffect(() => {
    let filteredTodos = todos.filter((todo) => todo
      .title.toLowerCase().includes(searchInput.trim().toLowerCase()));

    if (option === 'active') {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    }

    if (option === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    }

    setFilter(filteredTodos);
  }, [searchInput, todos, setFilter, option]);

  const reset = () => {
    setSearchInput('');
    setOption('all');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setOption(e.target.value)}
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
          value={searchInput}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchInput && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}

        </span>
      </p>
    </form>
  );
};
