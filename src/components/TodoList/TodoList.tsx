import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoPost } from '../Todo/TodoPost';

type Props = {
  todos: Todo[];
  handleEyeClick: (todoId: number) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleEyeClick,
  selectedTodoId,
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
        <TodoPost
          todo={todo}
          handleEyeClick={handleEyeClick}
          selectedTodoId={selectedTodoId}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
