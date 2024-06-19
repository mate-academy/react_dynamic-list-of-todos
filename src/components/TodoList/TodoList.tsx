import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  setModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  selectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setModalOpen,
  isOpen,
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
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            setModalOpen={setModalOpen}
            isOpen={isOpen}
            selectTodo={selectTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
