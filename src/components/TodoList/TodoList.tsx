import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = memo(({
  todos,
  setSelectedTodo,
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
        {todos.map(todo => (
          <TodoInfo
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
});
