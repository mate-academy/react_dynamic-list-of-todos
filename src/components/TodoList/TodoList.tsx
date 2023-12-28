import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  todoFocusedOn: Todo | null,
  focusOnTodo: (todo:Todo)=>void,
};

export const TodoList: React.FC<Props> = (
  { todos, todoFocusedOn, focusOnTodo },
) => (
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
      {todos
        .map(todo => (
          <TodoInfo
            key={todo.id}
            todoFocusedOn={todoFocusedOn}
            todo={todo}
            focusOnTodo={focusOnTodo}
          />
        ))}
    </tbody>
  </table>
);
