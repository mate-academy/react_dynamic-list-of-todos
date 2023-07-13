import React, { MouseEvent } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onTodoSelect: (event: MouseEvent<HTMLButtonElement>, todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onTodoSelect,
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
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          selectedTodoId={selectedTodoId}
          onTodoSelect={onTodoSelect}
        />
      ))}
    </tbody>
  </table>
);
