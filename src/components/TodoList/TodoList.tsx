import React, {
  useState, useEffect, useCallback,
} from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { TodoListProps } from '../../types';
import './TodoList.scss';
import { getTodos } from '../../api';

export const TodoList: React.FC<TodoListProps> = ({ todos, onUserSelect }) => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const filterTodos = () => {
    let todosByFilter = todos;

    switch (filterBy) {
      case 'not-completed':
        todosByFilter = todos?.filter(todo => !todo.completed) || null;
        break;
      case 'completed':
        todosByFilter = todos?.filter(todo => todo.completed) || null;
        break;
      default:
        break;
    }

    setFilteredTodos(todosByFilter);
    setVisibleTodos(todosByFilter);
    setQuery('');
  };

  const findTodo = () => {
    if (!appliedQuery.length) {
      setVisibleTodos(filteredTodos);

      return;
    }

    const foundTodos = filteredTodos
      ?.filter(todo => todo.title.toLowerCase()
        .includes(appliedQuery.toLowerCase()));

    setVisibleTodos(foundTodos || null);
  };

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500),
    [],
  );

  useEffect(() => {
    findTodo();
  }, [appliedQuery]);

  useEffect(() => {
    (async () => {
      setFilteredTodos(await getTodos());
      setVisibleTodos(await getTodos());
    })();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [filterBy]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="Search"
        data-cy="filterByTitle"
        value={query}
        onChange={({ target }) => {
          setQuery(target.value);
          applyQuery(target.value);
          findTodo();
        }}
      />
      <select
        name="status"
        value={filterBy}
        onChange={({ target }) => setFilterBy(target.value)}
      >
        <option value="all">
          All
        </option>
        <option value="not-completed">
          Not completed
        </option>
        <option value="completed">
          Completed
        </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {visibleTodos && (
            visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" />
                  <p>{todo.title}</p>
                </label>
                <button
                  data-cy="userButton"
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => onUserSelect(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
