import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setSelectedTodo,
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
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todoFromServer={todo}
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      ))}
    </tbody>
  </table>
));
