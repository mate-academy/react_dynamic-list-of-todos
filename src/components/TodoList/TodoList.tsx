import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selectTodo: (todo: Todo) => void;
  selectedTodoId: number | undefined;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectTodo,
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
          <TodoItem
            key={todo.id}
            selectedTodoId={selectedTodoId}
            selectTodo={selectTodo}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};
