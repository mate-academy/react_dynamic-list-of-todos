import React from 'react';
import { Todo } from './Todo';

type TodosListProps = {
  todos: GetTodos;

};

export const TodosList: React.FC<TodosListProps> = ({ todos }) => {
  return (
    <ul className="todo__list">
      {todos.map(todo => (
        <li key={todo.id} className="todo__item"><Todo todo={todo} /></li>
      ))}
    </ul>
  );
};
