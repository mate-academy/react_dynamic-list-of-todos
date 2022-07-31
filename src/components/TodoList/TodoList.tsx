import React, {
  useState, useEffect, useCallback,
} from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { Todo, TodoListProps } from '../../types';
import './TodoList.scss';
import { getTodos, getTodo, patch } from '../../api';

export const TodoList: React.FC<TodoListProps> = ({
  onUserSelect, selectedUserId,
}) => {
  const [todos, setTodos] = useState<null | Todo[]>();
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const filterTodos = () => {
    switch (filterBy) {
      case 'not-completed':
        return todos?.filter(todo => !todo.completed) || null;
      case 'completed':
        return todos?.filter(todo => todo.completed) || null;
      default:
        return todos;
    }
  };

  useEffect(() => {
    setVisibleTodos(filterTodos());
    setQuery('');
  }, [filterBy]);

  const findTodo = () => {
    if (!appliedQuery.length) {
      setVisibleTodos(filterTodos());

      return;
    }

    const foundTodos = filterTodos()
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
      setTodos(await getTodos());
    })();
  }, []);

  useEffect(() => {
    setVisibleTodos(filterTodos());
    if (appliedQuery) {
      findTodo();
    }
  }, [todos]);

  const onStatusChange = async (id: number, status: boolean) => {
    await patch(`/todos/${id}`, { completed: !status });
    if (todos) {
      const oldTodoIndex = todos.findIndex(todo => todo.id === id);
      const newTodo = await getTodo(id);

      const newTodos = [...todos];

      newTodos.splice(oldTodoIndex, 1, newTodo);

      setTodos(newTodos);
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="filter-container">
        <div className="searchbar">
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
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setAppliedQuery('');
            }}
          >
            X
          </button>
        </div>
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
      </div>
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
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onStatusChange(todo.id, !!todo.completed)}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  data-cy="userButton"
                  className={classNames('TodoList__user-button button', {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': selectedUserId === todo.userId,
                  })}
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
