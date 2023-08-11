import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/enum';

type Props = {
  setTodos: (a: Todo[]) => void
};

export const TodoFilter: React.FC<Props> = ({ setTodos }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const filteredByTitle = (todos: Todo[]) => {
      return todos.filter(
        todo => todo.title.toLowerCase().includes(title.toLowerCase()),
      );
    };

    getTodos().then(todosData => {
      if (title) {
        const filteredData = filteredByTitle(todosData);

        setTodos(filteredData);
      } else {
        setTodos(todosData);
      }
    });
  }, [title, setTodos]);

  const handleFind
    = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const getFilteredTodos = async (value: string) => {
    let filteredTodos: Todo[] = [];

    switch (value) {
      case FilterBy.ALL:
        filteredTodos = await getTodos();
        break;
      case FilterBy.ACTIVE:
        filteredTodos = (await getTodos()).filter(todo => !todo.completed);
        break;
      case FilterBy.COMPLETED:
        filteredTodos = (await getTodos()).filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setTodos(filteredTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => getFilteredTodos(e.target.value)}
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
          onChange={handleFind}
          value={title}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {title
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setTitle('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
