import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  showSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = props => {
  const { todos, showSelectedTodo, selectedTodo } = props;

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
            showSelectedTodo={showSelectedTodo}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
