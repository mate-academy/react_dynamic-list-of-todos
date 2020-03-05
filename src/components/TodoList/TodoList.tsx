import React from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

interface Props {
  todos: PreparedTodos;
  onTitleBtn: () => void;
  onNameBtn: () => void;
  onCompletedBtn: () => void;
}
export const TodoList: React.FC<Props> = ({
  todos,
  onTitleBtn,
  onNameBtn,
  onCompletedBtn,
}) => {
  return (
    <div className="table-wrapper">
      <table className="table table-striped w-100 w-50">
        <thead className="thead-dark">
          <tr>
            <th>
              <button
                className="btn btn-info"
                type="button"
                value="name"
                onClick={onNameBtn}
              >
                Name
              </button>
            </th>
            <th>
              <button
                className="btn btn-info"
                type="button"
                value="title"
                onClick={onTitleBtn}
              >
                Todo
              </button>
            </th>
            <th>
              <button
                className="btn btn-info"
                type="button"
                value="complete"
                onClick={onCompletedBtn}
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
};
