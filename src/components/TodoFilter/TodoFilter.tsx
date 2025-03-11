import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

type Props = {
  setFilteredTodos: (arg: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilteredTodos }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getTodos()
      .then(todoEl => {
        setTodos(todoEl);
      })
      .catch(error => {
        throw new Error(`Error: ${error}`);
      });
  }, []);

  useEffect(() => {
    const filteredTodos = todos
      .filter(todo => {
        if (filter === 'active') {
          return !todo.completed;
        }

        if (filter === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => {
        return todo.title.toLowerCase().includes(inputValue.toLowerCase());
      });

    setFilteredTodos(filteredTodos);
  }, [todos, filter, inputValue, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => {
              setFilter(e.target.value);
            }}
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
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setInputValue('');
                if (todos) {
                  setFilteredTodos(todos);
                }
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
