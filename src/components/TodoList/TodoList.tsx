import React from 'react';
import { Todo } from '../../helpers/api';
import { TodoCard } from '../TodoCard/TodoCard';
import './TodoList.css';

type Props = {
  todoList: Todo[];
}

export const TodoList: React.FC<Props> = ({ todoList }) => (
  <ul className="todo__list">
    {todoList.map((todo: Todo) => (
      <TodoCard todo={todo} key={todo.id} />
    ))}
  </ul>
);

