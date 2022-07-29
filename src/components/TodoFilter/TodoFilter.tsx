/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ setTodos }) => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos().then(setInitialTodos);
  }, []);

  const selectHandler = (selectionKind: string) => {
    switch (selectionKind) {
      case 'all':
        setTodos([...initialTodos]);
        break;
      case 'active':
        setTodos([...initialTodos].filter(todo => todo.completed === false));
        break;
      case 'completed':
        setTodos([...initialTodos]
          .filter(todo => todo.completed === true));
        break;
      default:
        break;
    }
  };

  const inputHandler = (input: string) => {
    setQuery(input);
    setTodos(initialTodos.filter(todo => todo.title.includes(input)));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              selectHandler(event.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">
              Active
            </option>
            <option value="completed">
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
          onChange={(event) => {
            inputHandler(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => inputHandler('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
