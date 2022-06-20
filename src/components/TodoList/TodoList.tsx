import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUser: (userId: number) => void,
};

enum Completed {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [todosList, setTodosList] = useState(todos);
  const [search, setSearch] = useState<string>('');
  const [completed, setCompleted] = useState<Completed | string>(Completed.all);

  useEffect(() => {
    setTodosList(todos.filter(item => {
      const isSearch = item.title.includes(search);

      switch (completed) {
        case Completed.active:
          return !item.completed && isSearch;

        case Completed.completed:
          return item.completed && isSearch;

        case Completed.all:
        default:
          return isSearch;
      }
    }));
  }, [search, completed, todos]);

  const randomOrder = () => {
    return setTodosList(
      [...todosList].sort(() => Math.random() - 0.5),
    );
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <div className="TodoList__nav">
          <input
            type="search"
            className="TodoList__search"
            placeholder="Search todo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="TodoList__select"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
          >
            <option value={Completed.all}>
              {Completed.all}
            </option>
            <option value={Completed.active}>
              {Completed.active}
            </option>
            <option value={Completed.completed}>
              {Completed.completed}
            </option>
          </select>
          <button
            type="button"
            className="TodoList__random button"
            onClick={() => randomOrder()}
          >
            Random
          </button>
        </div>
        <ul className="TodoList__list">
          {todosList.map((todo) => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--unchecked': todo.completed === false },
                { 'TodoList__item--checked': todo.completed === true },
              )}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className={classnames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                    todo.userId === selectedUserId,
                  },
                )}
                type="button"
                onClick={() => selectUser(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
