import React from 'react';
import { Todo, TodoWithUser } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';
import { getUser } from '../../api';

interface Props {
  todos: Todo[];
  onChange: (todo: TodoWithUser | null) => void;
  isTodoModal: boolean;
  onClose: (isTodoModal: boolean) => void;
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onChange,
  isTodoModal,
  onClose,
}) => {
  const handleDetailsOpen = (todo: Todo) => {
    onClose(true);
    getUser(todo.userId).then(user => onChange({
      ...todo,
      user,
    }));
  };

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
        {todos.map((todo) => {
          return (
            <TodoComponent
              todo={todo}
              key={todo.id}
              isTodoModal={isTodoModal}
              handleDetailsOpen={handleDetailsOpen}
            />
          );
        })}
      </tbody>
    </table>
  );
});
