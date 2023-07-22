import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { SelectedOption } from '../../types/SelectedOption';

type Props = {
  todos: Todo[];
  onChange: React.Dispatch<React.SetStateAction<Todo[]>>;
  visibleTodos: Todo[];
};

function selectTodos(selectedOption: string, todo: Todo) {
  switch (selectedOption) {
    case SelectedOption.Active:
      return !todo.completed;

    case SelectedOption.Completed:
      return todo.completed;

    case SelectedOption.All:
      return true;

    default:
      throw new Error('Impossible value');
  }
}

function filterTodos(query: string, todo: Todo) {
  return todo.title.toLowerCase().includes(query.toLowerCase());
}

export const TodoFilter: React.FC<Props> = ({ todos, onChange }) => {
  const [query, setQuery] = useState('');
  const [
    selectedOption,
    setSelectedOption,
  ] = useState<SelectedOption>(SelectedOption.All);

  useEffect(() => {
    onChange(todos
      .filter(todo => filterTodos(query, todo))
      .filter(todo => selectTodos(selectedOption, todo)));
  }, [query, selectedOption]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              event => setSelectedOption(event.target.value as SelectedOption)
            }
          >
            <option value={SelectedOption.All}>All</option>

            <option value={SelectedOption.Active}>Active</option>

            <option value={SelectedOption.Completed}>Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {(query.length > 0) && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
