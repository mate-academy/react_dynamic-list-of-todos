import React, { Dispatch, SetStateAction, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoFilterProps = {
  setSwitch: (value: string) => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  filter: string;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setSwitch,
  setTodos,
  filteredTodos,
  filter,
}) => {
  const [val, setVal] = useState<string>('');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSwitch(event.target.value);
  };

  const handleFind = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    setVal(value);

    let filtered = filteredTodos;

    if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (value) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(value),
      );
    }

    setTodos(filtered);
  };

  const clearValue = () => {
    setVal('');
    setTodos(filteredTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          onChange={handleFind}
          type="text"
          className="input"
          placeholder="Search..."
          value={val}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {val && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => clearValue()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
