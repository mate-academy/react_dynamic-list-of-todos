import React from 'react';
import './TodoList.css';
import cn from 'classnames';

import { Todo } from '../Todo/Todo';

interface Props {
  list: TodoType[];
}

export function TodoList(props: Props) {
  const { list } = props;

  return (
    <ul className="list">
      {list.map((todo: TodoType) => (
        <li key={todo.id} className={cn({ list__item: true, completed: todo.completed })}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
}
