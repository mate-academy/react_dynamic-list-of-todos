import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from './TodoInfo';

interface Props {
  todos: Todo[];
  choosenId: number | null;
  handleChooseTodoEye: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  choosenId,
  handleChooseTodoEye,
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
          choosenId={choosenId}
          todo={todo}
          handleChooseTodoEye={handleChooseTodoEye}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
