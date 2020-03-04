import React from 'react';
import { Todo } from './Todo';

interface Props {
  todos: PreparedTodo[];
  sortByTitle: () => void;
  sortByName: () => void;
  showCompleted: () => void;
}


export const TodoList: React.FC<Props> = ({
  todos,
  sortByTitle,
  showCompleted,
  sortByName,
}) => {
  return (
    <>
      <div>
        <button
          className="btn btn-info button-margin"
          type="button"
          onClick={sortByTitle}
        >
          sort by title
        </button>
        <button
          className="btn btn-info button-margin"
          type="button"
          onClick={showCompleted}
        >
          show completed
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={sortByName}
        >
          by user name
        </button>
      </div>
      <table className="table-bordered table-center">
        <thead>
          <tr className="bg-danger">
            <th>Todo</th>
            <th>Status</th>
            <th>UserName</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(item => <Todo key={item.id} {...item} />)}
        </tbody>
      </table>
    </>
  );
};
