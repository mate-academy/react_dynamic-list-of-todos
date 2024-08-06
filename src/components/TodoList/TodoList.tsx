import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setUserId: (v: number) => void;
  setShowModal: (v: boolean) => void;
  setSelectedTodo: (v: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setUserId,
  setShowModal,
  setSelectedTodo,
}) => (
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
          key={todo.id}
          todo={todo}
          setUserId={setUserId}
          setShowModal={setShowModal}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </tbody>
  </table>
);
