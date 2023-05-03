import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todosToShow: Todo[],
  showModal: (todo: Todo) => void,
  selectedTodoId: number,
};

export const TodoList: React.FC<Props> = ({
  todosToShow,
  showModal,
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
        {todosToShow.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            showModal={showModal}
            selectedTodoId={selectedTodoId}
          />
        ))}
      </tbody>
    </table>
  );
};
