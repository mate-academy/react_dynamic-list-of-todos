import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  selectedTodoId: number | undefined;
  onSelectedTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectedTodo,
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
      {todos.map(todo => {
        const isSelected = todo.id === selectedTodoId;

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={isSelected}
            onSelectedTodoChangeHandler={onSelectedTodo}
          />
        );
      })}
    </tbody>
  </table>
);
