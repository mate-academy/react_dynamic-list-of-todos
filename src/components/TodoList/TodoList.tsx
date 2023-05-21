import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  handleSelectTodo: (todoId: number) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleSelectTodo,
  selectedTodoId,
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
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            handleSelectTodo={handleSelectTodo}
            selectedTodoId={selectedTodoId}
          />
        ))}
      </tbody>
    </table>
  );
};
