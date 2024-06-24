import React from 'react';
import { Todo } from '../../types/Todo';
import TodoRow from './TodoRow';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  handleModalChange: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  handleModalChange,
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
        {todos.map((todo: Todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            selectedTodo={selectedTodo}
            handleModalChange={handleModalChange}
          />
        ))}
      </tbody>
    </table>
  );
};
