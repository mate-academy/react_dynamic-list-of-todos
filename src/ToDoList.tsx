import React from 'react';
import { TodoItem } from './ToDo';

interface Props {
  todos: PreparedTodos;

}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>

      {todos.map(todo => (
        <tr key={todo.id} className="list-item">
          <TodoItem todo={todo} />
        </tr>
      ))}
    </>
  );
};
