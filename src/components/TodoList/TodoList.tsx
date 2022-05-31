import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos:Todo[],
  selectUser: (x:number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [sortTodo, setSortTodo] = useState(todos);
  const [completeStatus, setCompleteStatus] = useState('All');

  useEffect(() => {
    setSortTodo(todos.filter(todo => {
      switch (completeStatus) {
        case 'All':
          return todo && todo.title.toLowerCase().includes(query);

        case 'Complete':

          return todo.completed
          && todo.title.toLowerCase().includes(query);

        case 'notComplete':

          return !todo.completed
          && todo.title.toLowerCase().includes(query);

        default:
          return 0;
      }
    }));
  }, [todos, completeStatus, query]);

  const filterByComplete = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompleteStatus(event.target.value);
  };

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const randomize = () => {
    setSortTodo(sortTodo.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label>
        Filter by name:
        <input type="text" onChange={search} value={query} />
        <select
          value={completeStatus}
          onChange={filterByComplete}
        >
          <option value="All">
            All
          </option>
          <option value="Complete">
            Complete
          </option>
          <option value="notComplete">
            notComplete
          </option>
        </select>
      </label>

      <button type="button" onClick={randomize}>
        Random
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {sortTodo.map((todo) => (
            <li className={
              classNames(
                'TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )
            }
            >
              <label>
                <input type="checkbox" checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                className={
                  classNames(
                    'TodoList__user-button', 'button', {
                      'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                    },
                  )
                }
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId ? todo.userId : 'undefined'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
