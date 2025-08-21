import React from 'react';
import { Todo } from '../../types/Todo';
import { Todoinfo } from '../TodoInfo/TodoInfo';
type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos, handleChoosenDataTodo }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" data-cy="iconCompleted" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo: Todo) => {
          return (
            <Todoinfo
              key={todo.id}
              todo={todo}
              handleChoosenDataTodo={handleChoosenDataTodo}
            />
          );
        })}
      </tbody>
    </table>
  );
};
