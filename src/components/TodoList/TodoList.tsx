import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  openModal: (todo: Todo) => void;
  todos: Todo[];
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  openModal,
  selectedTodo,
}) => {
  if (todos.length === 0) {
    return <p data-cy="no-todos-message">No todos found</p>;
  }

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
          <TodoInfo
            key={todo.id}
            todo={todo}
            openModal={openModal}
            isCurrent={todo.id === selectedTodo?.id}
          />
        ))}
      </tbody>
    </table>
  );
};
