import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoRecord } from '../Todo/Todo';

type Props = {
  todoList: Todo[];
  selectedId: number | null;
  onClick: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  selectedId,
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
      {todoList.map(todo => {
        return (
          <TodoRecord
            key={todo.id}
            todo={todo}
            selectedId={selectedId}
            onClick={onClick}
          />
        );
      })}
    </tbody>
  </table>
);
