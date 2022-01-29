// import { time } from 'console';
import React from 'react';
import './TodoList.scss';

interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUserId: number,
  onChangeStatus: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
  onChangeStatus,
}) => {
  const todoList = selectedUserId === 0 ? todos
    : todos.filter(todo => todo.userId === selectedUserId);

  return (
    <div className="TodoList">

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todoList.map(todo => (
            todo.completed ? (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--checked"
              >
                <label htmlFor={todo.id.toString()}>
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    id={todo.id.toString()}
                    onChange={() => (
                      todo.completed === false
                    )}
                  />
                  {todo.title}
                </label>

                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ) : (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label htmlFor={todo.id.toString()}>
                  <input
                    type="checkbox"
                    readOnly
                    id={todo.id.toString()}
                    onChange={() => onChangeStatus(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button"
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            )
          ))}

        </ul>
      </div>
    </div>
  );
};
