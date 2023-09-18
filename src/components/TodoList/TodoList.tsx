import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[],
  selectedTodo: Todo | undefined,
  setSelectedTodoId: (arg: number) => void,
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setSelectedTodoId,
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
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setSelectedTodoId={setSelectedTodoId}
          selectedTodo={selectedTodo}
        />
      ))}
    </tbody>
  </table>
);
