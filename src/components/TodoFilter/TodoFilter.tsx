import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import React, { useEffect, useState } from 'react';

type Props = {
  toDos: Todo[];
  setToDos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ setToDos }) => {
  const [selectedValue, setSelectedValue] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getTodos().then(todos => {
      const filteredTodos = todos.filter(todo => {
        if (selectedValue === 'completed') {
          return todo.completed;
        }

        if (selectedValue === 'active') {
          return !todo.completed;
        }

        return true;
      });

      let searchedTodos = filteredTodos;

      if (inputValue) {
        searchedTodos = filteredTodos.filter(todo => {
          const lowerInputValue = inputValue.toLowerCase();
          const lowerTodoTitle = todo.title.toLowerCase();

          return lowerTodoTitle.includes(lowerInputValue);
        });
      }

      setToDos(searchedTodos);
    });
  }, [selectedValue, inputValue, setToDos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectedValue}
            onChange={e => setSelectedValue(e.target.value)}
            data-cy="statusSelect"
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
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            <button
              onClick={() => setInputValue('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
