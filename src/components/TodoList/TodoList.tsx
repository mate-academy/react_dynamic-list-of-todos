import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  searchFilter: string;
  modalId: number | undefined;
  setModalId: (a: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  searchFilter,
  modalId,
  setModalId,
}) => {
  const noSearchMatch = searchFilter.length > 0 && todos.length === 0;

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
            key={todo.id}
            modalId={modalId}
            setModalId={setModalId}
          />
        ))}

        {noSearchMatch && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
      </tbody>
    </table>
  );
};
