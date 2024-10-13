import React from 'react';
import { TodoBody } from '../TodoBody/TodoBody';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onChoosingTodo: (todo: Todo) => void;
  chosenTodoId?: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onChoosingTodo,
  chosenTodoId,
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
        <th></th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <TodoBody
          key={todo.id}
          chosenTodoId={chosenTodoId}
          onChoosingTodo={onChoosingTodo}
          todo={todo}
        />
      ))}
    </tbody>
  </table>
);
