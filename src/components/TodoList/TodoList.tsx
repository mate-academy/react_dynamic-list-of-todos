import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../../TodoInfo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectTodo: (todoId: Todo | null) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodo,
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
          <TodoInfo
            key={todo.id}
            todo={todo}
            selectTodo={selectTodo}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
