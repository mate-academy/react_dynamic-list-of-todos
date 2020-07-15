import React, { FC } from 'react';
import { Todo } from '../Todo/Todo';
import { TodosWithUsers } from '../../interfaces';
import './TodoList.css';

interface Props {
  todos: TodosWithUsers[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <div className="TodoList">
    {todos.map(todo => (
      <Todo todo={todo} key={todo.id} />
    ))}
  </div>
);
