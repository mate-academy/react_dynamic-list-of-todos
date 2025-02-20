import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

interface FilterTodosProps {
  setFilterTodos: (filtered: Todo[]) => void;
}

export const TodoFilter: React.FC<FilterTodosProps> = ({ setFilterTodos }) => {
  const [filter, setFilter] = useState('all');
  const [formValue, setFormValue] = useState('');
  const [todosApi, setTodosFromApi] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(data => setTodosFromApi(data));
  }, []);

  useEffect(() => {
    let filteredTodos = [...todosApi];

    switch (filter) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'all':
      default:
        break;
    }

    if (formValue.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(formValue.toLowerCase()),
      );
    }

    setFilterTodos(filteredTodos);
  }, [filter, formValue, todosApi, setFilterTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => setFilter(e.target.value)}
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
          value={formValue}
          onChange={e => setFormValue(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {formValue && (
          <span className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFormValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
