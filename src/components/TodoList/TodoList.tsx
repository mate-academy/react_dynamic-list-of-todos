import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            {hasCompleted && (
              <span className="icon">
                <i className="fas fa-check-circle"></i>
              </span>
            )}
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        <TodoInfo
          todos={todos}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      </tbody>
    </table>
  );
};
