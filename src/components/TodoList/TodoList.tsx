import React from 'react';
import { Todo } from '../Todo/Todo';
import { PreparedTodoInterface } from '../../interfaces';

interface TodoListInterface {
  todos: PreparedTodoInterface[];
}

export const TodoList: React.FC<TodoListInterface> = (props) => {
  const { todos } = props;

  return (
    <ul className="list">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
