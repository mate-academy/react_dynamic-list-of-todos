import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodoId?: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodoId,
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
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            selectedTodoId={selectedTodoId}
          />
        ))}
      </tbody>
    </table>
  );
};
