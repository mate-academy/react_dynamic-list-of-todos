import React from 'react';
import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  UserId: number;
}

interface Props {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoFilter: React.FC<Props> = React.memo(({ todo, setTodo }) => {
  const [search, setSearch] = useState('');

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    setSearch(valor);

    if (valor !== '') {
      setTodo(
        todo.filter((t: Todo) =>
          t.title.toLowerCase().includes(valor.toLowerCase()),
        ),
      );
    }
  };

  const todoAll = (): void => {
    setTodo(todo);
  };

  const todoActive = (): void => {
    setTodo(todo.filter((t: Todo) => t.completed === false));
  };

  const todoCompleted = (): void => {
    setTodo(todo.filter((t: Todo) => t.completed === true));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;

    if (value === 'all') {
      todoAll();
    }

    if (value === 'active') {
      todoActive();
    }

    if (value === 'completed') {
      todoCompleted();
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChange}>
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
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeSearch(e)
          }
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            type="button"
            data-cy="clearSearchButton"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
});
TodoFilter.displayName = 'TodoFilter';
