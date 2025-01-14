import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';
type Props = {
  todos: Todo[];
  selectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo }) => {
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
        {todos.map(todo => {
          return (
            <TodoCard
              todo={todo}
              key={todo.id}
              selectedTodo={() => selectedTodo(todo)}
            />
          );
        })}
      </tbody>
    </table>
  );
};
