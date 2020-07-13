import React from 'react';
import TodoItem from './TodoItem';

import { Todos } from '../api/api';

type Props = {
  todoList: Todos[];
}

const TodoList: React.FC<Props> = ({ todoList }) => (
  <ul className="todo_list">
    {todoList.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </ul>
);

export default TodoList;
