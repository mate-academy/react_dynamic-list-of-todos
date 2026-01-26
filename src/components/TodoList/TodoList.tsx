import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListItem';

type Props = {
  todos: Todo[];
  selectTodo: (todo: Todo) => void;
  selectedTodoId: number | undefined;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => {
  function handleSelectClick(todo: Todo) {
    selectTodo(todo);
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
            selectTodo={() => handleSelectClick(todo)}
            isSelected={todo.id === selectedTodoId}
          />
        ))}
      </tbody>
    </table>
  );
};
