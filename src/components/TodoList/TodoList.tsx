import React, {useState} from 'react';
import './TodoList.scss';
import classN from 'classnames'


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
  selectedUserId,
  setSelectedUserId
  }) => {
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState('');

  const filteredList = () => {
    if (completed === Status.Active) {
      return todos.filter(todo => (
        todo.title.toLowerCase().startsWith(query.toLowerCase())
        && !todo
      ));
    }
    if (completed === Status.Completed) {
      return todos.filter(todo => (
        todo.title.toLowerCase().startsWith(query.toLowerCase())
        && todo
      ));
    }

    return todos.filter(todo => (
      todo.title.toLowerCase().startsWith(query.toLowerCase())
    ));
  };

  const filtered = filteredList()

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
              onChange={(event) => {
                setCompleted(event.target.value);
              }}
            >
              <option value={Status.All}>All</option>
              <option value={Status.Active}>Active</option>
              <option value={Status.Completed}>Completed</option>
            </select>
          </form>

          <ul className="TodoList__list">
            {filtered.map(todo => (
              <li className="TodoList__item TodoList__item--unchecked">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    readOnly
                  />
                  <p>title : {todo.title}</p>
                </label>

                <button
                  className={classN(
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
                  userId : {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
