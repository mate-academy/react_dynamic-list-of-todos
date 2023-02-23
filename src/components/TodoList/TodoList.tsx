import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
  handleTodoSelect: (todo: Todo) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleTodoSelect,
  selectedTodo,
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
        <th> </th>
      </tr>
    </thead>

    <tbody>

      {todos.map((todo) => {
        /* eslint-disable max-len */
        return <TodoInfo todo={todo} key={todo.id} handleTodoSelect={handleTodoSelect} selectedTodo={selectedTodo} />;
      })}
    </tbody>
  </table>
);
