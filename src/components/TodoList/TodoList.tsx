import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onSelectTodoId: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodoId,
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

      <TodoInfo
        todos={todos}
        selectedTodoId={selectedTodoId}
        onSelectTodoId={onSelectTodoId}
      />
    </table>
  );
};
