import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  modalTodo: Todo | null;
  setModalTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  modalTodo,
  setModalTodo,
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
            key={todo.id}
            todo={todo}
            modalTodo={modalTodo}
            setModalTodo={setModalTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
