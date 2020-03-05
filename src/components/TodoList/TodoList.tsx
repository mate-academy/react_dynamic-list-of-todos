import React from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

interface Props {
  todos: PreparedTodos;
  handleSort: (filter: string) => void;
}
export const TodoList: React.FC<Props> = ({
  todos,
  handleSort,
}) => (
  <div className="table-wrapper">
    <table className="table table-striped w-100 w-50">
      <thead className="thead-dark">
        <tr>
          <th>
            <button
              className="btn btn-info"
              type="button"
              value="name"
              onClick={() => handleSort('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              className="btn btn-info"
              type="button"
              value="title"
              onClick={() => handleSort('title')}
            >
              Todo
            </button>
          </th>
          <th>
            <button
              className="btn btn-info"
              type="button"
              value="complete"
              onClick={() => handleSort('completed')}
            >
              Status
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(item => <Todo key={item.id} todo={item} />)}
      </tbody>
    </table>
  </div>
);
