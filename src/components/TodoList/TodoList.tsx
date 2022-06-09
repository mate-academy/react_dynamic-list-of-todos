import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  currentId: number;
  onShuffle: () => void;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    setSelectedUserId,
    currentId,
    onShuffle,
  } = props;
  const [preparedTodos, setPrepaderTodos] = useState(todos);
  const [queryParam, setQueryParam] = useState('');
  const [selectOption, setSelectedOption] = useState('all');

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(e.target.value);
  }

  function setNewUserId(id: number) {
    if (id !== currentId) {
      setSelectedUserId(id);
    }
  }

  useEffect(() => {
    setPrepaderTodos(todos.filter(todo => {
      const isQuery = todo.title.toLocaleLowerCase()
        .includes(queryParam.toLocaleLowerCase());

      switch (selectOption) {
        case 'active':
          return isQuery && !todo.completed;
        case 'completed':
          return isQuery && todo.completed;
        default:
          return isQuery;
      }
    }));
  }, [queryParam, todos, selectOption]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <label
          htmlFor="search"
          className="TodoList__input-lable"
        >
          Search todo
        </label>
        <input
          type="text"
          className="TodoList__input"
          id="search"
          value={queryParam}
          onChange={(e) => setQueryParam(e.target.value)}
        />
        <button
          type="button"
          onClick={onShuffle}
        >
          Randomize
        </button>
        <select
          value={selectOption}
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <ul className="TodoList__list" data-cy="listOfTodos">
          {preparedTodos.map(todo => (
            !todo.completed ? (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'TodoList__user-button button',
                    {
                      'TodoList__user-button--selected':
                    +todo.userId === +currentId,
                    },
                  )}
                  type="button"
                  data-cy="userButton"
                  onClick={() => setSelectedUserId(+todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            )
              : (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--checked"
                >
                  <label>
                    <input type="checkbox" checked readOnly />
                    <p>{todo.title}</p>
                  </label>
                  <button
                    className="TodoList__user-button button"
                    type="button"
                    data-cy="userButton"
                    onClick={() => setNewUserId(+todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              )
          ))}
        </ul>
      </div>
    </div>
  );
};
