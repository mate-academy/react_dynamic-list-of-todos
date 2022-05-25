import React, { useState, useMemo, useCallback } from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  todos: Todo[],
  setSelectedUserId: (arg0: number) => void,
  selectedUserId: number,
};

enum Status {
  Active = 'Active',
  Completed = 'Completed',
  All = 'All',
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState(Status.All);

  const filterTodos = () => {
    switch (completed) {
      case Status.Active:
        return todos.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
          && todo.completed === false
        ));

      case Status.Completed:
        return todos.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
          && todo.completed === true
        ));

      case Status.All:
        return todos.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
        ));

      default: return todos;
    }
  };

  const filtered = useMemo(() => {
    return filterTodos();
  }, [todos, completed]);

  const changeStatus = useCallback((event) => {
    setCompleted(event.target.value as Status);
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <form action="">
          <input
            type="text"
            data-cy="filterByTitle"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <select
            value={completed}
            onChange={changeStatus}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </form>
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {filtered
            && filtered.map(todo => (
              <li className={`TodoList__item TodoList__item--${todo.completed}`} key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    disabled
                  />
                  <p>{todo.title}</p>
                </label>

                {todo.userId
                  && (
                    <button
                      data-cy="userButton"
                      className={cn(
                        'TodoList__user-button', 'button',
                        {
                          'TodoList__user-button--selected':
                          todo.userId === selectedUserId,
                        },
                      )}
                      type="button"
                      onClick={() => (
                        setSelectedUserId(todo.userId)
                      )}
                    >
                      {`User#${todo.userId}`}
                    </button>
                  )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
