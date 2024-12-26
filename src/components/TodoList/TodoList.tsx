import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem.tsx';

type Props = {
  todoList: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  setSelectedTodo,
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
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSelect={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      ))}
    </tbody>
  </table>
);
