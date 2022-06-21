import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Todo } from '../../react-app-env';
import './TodoList.scss';
import { requestTodo } from '../../api';

type Props = {
  selectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ selectUser }) => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    requestTodo()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
  }, []);

  const categoryOfTodos = (todosToFilter: Todo[], group: string) => {
    if (group === 'completed') {
      return todosToFilter.filter(todo => todo.completed);
    }

    if (group === 'active') {
      return todosToFilter.filter(todo => !todo.completed);
    }

    return todosToFilter;
  };

  const filterTodos = (group2: Todo[]) => {
    return group2.filter(todo => todo.title.includes(searchText));
  };

  const groupOfTodos = categoryOfTodos(todos, category);

  const todosToShow = filterTodos(groupOfTodos);

  const shuffleArray = (todosToShuffle: Todo[]) => {
    return todosToShuffle
      .map(todo => ({ todo, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ todo }) => todo);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="filter todos"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          data-cy="filterByTitle"
        />

        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
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

        <button
          type="button"
          onClick={() => {
            setTodos(shuffleArray([...todos]));
          }}
        >
          Random
        </button>

        <ul className="TodoList__list" data-cy="listOfTodos">
          {todosToShow.map(todo => {
            return (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                  className="button
                    TodoList__user-button
                    TodoList__user-button--selected"
                  data-cy="userButton"
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
