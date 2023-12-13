import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todoitem';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  todoSelected: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  todoSelected,
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
      <TodoItem
        todos={todos}
        onSelectTodo={onSelectTodo}
        todoSelected={todoSelected}
      />
    </tbody>
  </table>
);
