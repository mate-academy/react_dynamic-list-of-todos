import React from 'react';
import { Todo } from './Todo';
import { Props } from './types';



const TodoList: React.FC<Props> = (props) => {
  const { preparedTodos } = props;

  return (
    <>
      <table className="table">
        <caption><strong>ToDo List</strong></caption>
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {preparedTodos.map(item => (
            <Todo
              todo={item}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
