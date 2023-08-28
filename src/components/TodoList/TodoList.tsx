import React from 'react';
import { Todo } from '../../types/Todo';
import { ToDoItem } from '../../ToDo';

type Props = {
  list: Todo[],
};

export const TodoList: React.FC<Props> = ({ list }) => {
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

        {list.map(todo => <ToDoItem todo={todo} key={todo.id} />)}

      </tbody>
    </table>
  );
};
