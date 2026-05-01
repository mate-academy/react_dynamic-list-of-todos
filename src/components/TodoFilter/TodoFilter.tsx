import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setFilterTodos: (todos: Todo[]) => void;
  todos: Todo[];
};

enum StatusSelect {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  setFilterTodos: setTodos,
  todos,
}) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(`${StatusSelect.all}`);

  useEffect(() => {
    if (selected === StatusSelect.all) {
      const filterTodos: Todo[] = todos.filter(todo => {
        if (value) {
          return todo.title.toLowerCase().includes(value.toLowerCase());
        }

        return true;
      });

      setTodos(filterTodos);
    } else if (selected === StatusSelect.active) {
      const filterTodos: Todo[] = todos.filter(todo => {
        if (value) {
          return (
            todo.completed === false &&
            todo.title.toLowerCase().includes(value.toLowerCase())
          );
        }

        return todo.completed === false;
      });

      setTodos(filterTodos);
    } else if (selected === StatusSelect.completed) {
      const filterTodos: Todo[] = todos.filter(todo => {
        if (value) {
          return (
            todo.completed === true &&
            todo.title.toLowerCase().includes(value.toLowerCase())
          );
        }

        return todo.completed === true;
      });

      setTodos(filterTodos);
    }
  }, [value, selected, todos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            <option value={`${StatusSelect.all}`}>All</option>
            <option value={`${StatusSelect.active}`}>Active</option>
            <option value={`${StatusSelect.completed}`}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
