import React, { Dispatch, SetStateAction, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoListType } from '../../types/TodoListType';

type Props = {
  todoList: TodoListType[],
  setSelectedUserId: Dispatch<SetStateAction<any>>
};

enum TypeOfShow {
  All = 'all',
  Completed = 'completed',
  Uncompleted = 'uncompleted'
}

export const TodoList: React.FC<Props> = ({ todoList, setSelectedUserId }) => {
  const [filterTitle, setFilterTitle] = useState('');
  const [shownBy, setShown] = useState('all');
  let resultList: TodoListType[];

  const todoListCopy = filterTitle.length
    ? todoList
      .filter(todo => todo.title.toLowerCase()
        .includes(filterTitle.toLowerCase()))
    : [...todoList];

  switch(shownBy) {
    case TypeOfShow.Completed:
      resultList = todoListCopy.filter(todo => todo.completed);
      break;
    case TypeOfShow.Uncompleted:
      resultList = todoListCopy.filter(todo => !todo.completed);
      break;
    default:
      resultList = [...todoListCopy];
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">

        Select:
        <select
          name="slect"
          id="select"
          onChange={({ target }) => setShown(target.value)}
        >
          <option value={TypeOfShow.All}>All</option>
          <option value={TypeOfShow.Completed}>Completed</option>
          <option value={TypeOfShow.Uncompleted}>Uncompleted</option>
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
