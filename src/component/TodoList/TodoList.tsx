import React from 'react';
import './TodoList.css';
import { Todo } from '../Todo/Todo';

interface Props {
  list: TodoType[];
}

export function TodoList(props: Props) {
  const { list } = props;

  return (
    <ul className="list">
      {list.map((todo: TodoType) => (
        <li key={todo.id} className={todo.completed ? 'list__item completed' : 'list__item'}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
}
