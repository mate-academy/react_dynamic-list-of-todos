import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListItem/TodoListItem';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  onSelectedTodo?: Todo;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  onSelectedTodo: selectedTodo,
}) => {
  function handleSelectClick(todo: Todo) {
    onSelectTodo(todo);
  }

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
          <TodoListItem
            key={todo.id}
            todo={todo}
            onSelectTodo={() => handleSelectClick(todo)}
            isSelected={todo.id === selectedTodo?.id}
          />
        ))}
      </tbody>
    </table>
  );
};
