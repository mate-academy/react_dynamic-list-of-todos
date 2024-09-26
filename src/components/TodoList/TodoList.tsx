import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Prpops = {
  todos: Todo[];
  selectedTodo?: Todo | null;
  onTodoSelect?: (todo: Todo) => void;
};

export const TodoList: React.FC<Prpops> = ({
  todos,
  onTodoSelect = () => {},
  selectedTodo = null,
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
            isSelected={todo.id === selectedTodo?.id}
            todo={todo}
            onViewButtonClick={() => onTodoSelect(todo)}
          />
        ))}
      </tbody>
    </table>
  );
};
