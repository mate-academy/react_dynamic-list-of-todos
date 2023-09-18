import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  onToggleModal: (todo:Todo | null) => void;
  selectedTodoId: number | undefined;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onToggleModal,
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
        <TodoItem
          key={todo.id}
          onToggleModal={onToggleModal}
          todo={todo}
          selectedTodoId={selectedTodoId}
        />
      ))}
    </tbody>
  </table>
);
