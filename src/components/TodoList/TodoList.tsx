import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListBody } from '../TodoListBody';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoClick: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoClick,
  selectedTodo,
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
    <TodoListBody
      todos={todos}
      onTodoClick={onTodoClick}
      selectedTodo={selectedTodo}
    />
  </table>
);
