import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  todoId: number;
  onModalIdChange: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = React.memo((props) => {
  const {
    todos,
    todoId,
    onModalIdChange,
  } = props;

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
            todoId={todoId}
            onSelectedIdChange={onModalIdChange}
          />
        ))}
      </tbody>
    </table>
  );
});
