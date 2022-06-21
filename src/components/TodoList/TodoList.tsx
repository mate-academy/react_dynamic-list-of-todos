/* eslint-disable no-console */
import cn from 'classnames';
import { useState } from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  toDos: Todo[],
  selectedUserId: number
  selectUser: (userId: number) => void
}

export const TodoList: React.FC<Props> = ({
  toDos,
  selectedUserId,
  selectUser,
}) => {
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('all');
  // const [preparedList, setPreparedList] = useState<Todo[]>([]);

  const prepareTodo = (list: Todo[]) => {
    console.log('I started');
    let result = list;

    if (query !== '') {
      result = result.filter((element: Todo) => (
        element.title.includes(query)
      ));
    }

    switch (filterBy) {
      case 'active':
        return result.filter((todo: Todo) => todo.completed === false);

      case 'completed':
        return result.filter((todo: Todo) => todo.completed === true);

      default:
        return result;
    }
  };

  // const shuffle = () => {
  //   setPreparedList((corentState: Todo[]) => (
  //     [...corentState].sort(() => Math.random() - 0.5)
  //   ));
  // };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        value={query}
        data-cy="filterByTitle"
        onChange={event => {
          setQuery(event.target.value);
        }}
      />

      <select
        name="status"
        value={filterBy}
        onChange={event => {
          setFilterBy(event.target.value);
        }}
      >

        <option value="all">
          All
        </option>
        <option value="active">
          Active
        </option>
        <option value="completed">
          Completed
        </option>
      </select>

      {/* <button
        type="button"
        onClick={shuffle}
      >
        Rundomize
      </button> */}

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {prepareTodo(toDos).map((todo: Todo) => (
            <li
              key={todo.id}
              className={cn('TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={cn('TodoList__user-button',
                  'button',
                  {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': selectedUserId === todo.userId,
                  })}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  selectUser(todo.userId);
                }}
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
