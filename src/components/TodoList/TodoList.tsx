import React from 'react';
import { Todo } from '../api/types';

interface TodoListProps {
  todos: Todo[];
  onShow: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onShow }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.title} <button onClick={() => onShow(todo)}>Show</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
