import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  getCurrentTodo: (todo: Todo) => void;
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  getCurrentTodo,
  isModalOpen,
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
          todo={todo}
          key={todo.id}
          getCurrentTodo={getCurrentTodo}
          isModalOpen={isModalOpen}
        />
      ))}
    </tbody>
  </table>
);
