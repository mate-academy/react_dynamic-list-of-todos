import React, { Dispatch, SetStateAction, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoListType } from '../../types/TodoListType';
// import Class from 'classnames';

type Props = {
  todoList: TodoListType[],
  setSelectedUserId: Dispatch<SetStateAction<number>>
};

export const TodoList: React.FC<Props> = ({ todoList, setSelectedUserId }) => {
  const [filterTitle, setFilterTitle] = useState('');
  const [shownBy, setShown] = useState(1);
  let resultList: TodoListType[];

  const todoListCopy = filterTitle.length
    ? todoList
      .filter(todo => todo.title.toLowerCase()
        .includes(filterTitle.toLowerCase()))
    : [...todoList];

  if (shownBy !== 1) {
    resultList = todoListCopy.filter(todo => (shownBy === 2
      ? todo.completed
      : !todo.completed));
  } else {
    resultList = [...todoListCopy];
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">

        Select:
        <select
          name="slect"
          id="select"
          onChange={({ target }) => setShown(Number(target.value))}
        >
          <option value="1">All</option>
          <option value="2">Completed</option>
          <option value="3">Uncompleted</option>
        </select>

        Filter:
        <input
          type="text"
          value={filterTitle}
          onChange={({ target }) => setFilterTitle(target.value)}
        />

        <ul className="TodoList__list">
          {
            resultList.map(todo => (
              <li
                key={todo.id}
                className={
                  classNames('TodoList__item',
                    { 'TodoList__item--uncompleted': !todo.completed })
                }
              >
                <h3>{todo.id}</h3>
                <label>
                  <input type="checkbox" checked readOnly />
                  <p>{todo.title}</p>
                </label>
                <h1>
                  Completed:
                  {todo.completed ? 'Yes' : 'No'}
                </h1>
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => setSelectedUserId(todo.userId)}
                >
                  Select User
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
