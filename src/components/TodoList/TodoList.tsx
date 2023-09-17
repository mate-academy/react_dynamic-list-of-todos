import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoTask } from '../TodoTask/TodoTask';

type Props = {
  todos: Todo[],
  activeTodoId?: number | null,
  onActiveTodo: (activeId: number) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  activeTodoId,
  onActiveTodo,
}) => {
  return (
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
        {todos.map((todo) => (
          <TodoTask
            key={todo.id}
            todo={todo}
            activeTodoId={activeTodoId}
            onActiveTodo={onActiveTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
