import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  currentTodo: Todo | null;
  setCurrentTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  setCurrentTodo,
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
          currentTodo={currentTodo}
          setCurrentTodo={setCurrentTodo}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
