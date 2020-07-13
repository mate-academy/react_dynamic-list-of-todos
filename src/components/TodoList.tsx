import React from 'react';
import classnames from 'classnames';

type Props = {
  todos: Array<TodosFromServer>;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <ul className="todo__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="todo__item"
          >
            <h3>{todo.user.name}</h3>
            <p>{todo.title}</p>
            <p
              className={classnames('item__status', {
                item__completed: todo.completed,
              })}
            >
              {todo.completed ? 'Done' : 'In Process'}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
