import React from 'react';
import { Todo } from './interfaces';

interface Props {
  todos: Todo[];
}

const ListTodos: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <div className={todo.completed ? 'todo completed' : 'todo'} key={todo.id}>
          <div className="id-todo">
            <p className="id__text">
              {todo.id}
            </p>
          </div>
          <div className="name">
            <p className="name__text">
              {todo.user.username}
            </p>
          </div>
          <div className="title">
            <p className="title__text">
              {todo.title}
            </p>
          </div>
          <div className="status">
            <p className="status__text">
              {todo.completed ? 'Completed' : 'Active'}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListTodos;
