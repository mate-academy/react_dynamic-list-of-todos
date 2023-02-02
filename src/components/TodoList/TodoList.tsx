import React from 'react';
import { Todo } from '../../types';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  selected: Todo | null,
  onClick: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selected,
  onClick,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => {
        const isSelectedTodo = todo === selected;

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={isSelectedTodo}
            onClick={onClick}
          />
        );
      })}
    </tbody>
  </table>
);
