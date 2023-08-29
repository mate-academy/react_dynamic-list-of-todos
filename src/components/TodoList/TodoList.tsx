import React from 'react';
import { Todo } from '../../types/Todo';
import { ToDoItem } from '../../ToDo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
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

        {todos.map(todo => <ToDoItem todo={todo} key={todo.id} />)}

      </tbody>
    </table>
  );
};
