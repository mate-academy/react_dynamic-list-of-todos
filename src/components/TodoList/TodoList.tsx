import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  setSelectedTodo: (value: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodo,
}) => {
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
        {todos.map((todo: Todo) => (
          <TodoItem
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
