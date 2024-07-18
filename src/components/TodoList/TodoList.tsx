import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoUser } from '../TodoUser/TodoUser';
interface Props {
  todos: Todo[];
  onOpen: (todo: Todo) => void;
  selectedTodoId: number | null;
}
export const TodoList: React.FC<Props> = ({
  todos,
  onOpen,
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
          <TodoUser
            todo={todo}
            onOpen={onOpen}
            selectedTodoId={selectedTodoId}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
