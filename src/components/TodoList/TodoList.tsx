import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListItem/TodoListItem';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
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

    <tbody>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onSelect={onSelect}
          selectedTodo={selectedTodo}
        />
      ))}
    </tbody>
  </table>
);
