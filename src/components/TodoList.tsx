import React from 'react';
import { TodoItem } from './TodoItem';
import './TodoList.css';

type Props = {
  todos: TodosWithUsers[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <td>Title</td>
          <td>Name</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoItem
            title={todo.title}
            user={todo.user}
            id={todo.id}
            complete={todo.complete}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  </div>
);
