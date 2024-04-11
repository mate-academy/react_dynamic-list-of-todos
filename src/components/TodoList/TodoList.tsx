import React, { useContext } from 'react';
import { StateContext } from '../../context/ReduxContext';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList: React.FC = () => {
  const { todos } = useContext(StateContext);

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
          <TodoInfo key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
