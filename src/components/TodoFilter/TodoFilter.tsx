import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setFilterTodos: (b: Todo[]) => void;
}

export const TodoFilter = ({ todos, setFilterTodos }: Props) => {
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    let updatedTodos = todos;

    switch (select) {
      case 'active':
        updatedTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        updatedTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setFilteredTodos(updatedTodos);
    setFilterTodos(updatedTodos);
  }, [select, todos, setFilterTodos]);

  useEffect(() => {
    let updatedFilteredTodos = filteredTodos;

    if (value.trim() !== '') {
      updatedFilteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(value.toLowerCase()),
      );
    }

    setFilterTodos(updatedFilteredTodos);
  }, [value, filteredTodos, setFilterTodos]);

  const handleClearSearch = () => {
    setValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={event => setSelect(event.target.value)}
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
          value={value}
          onChange={event => setValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
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
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
