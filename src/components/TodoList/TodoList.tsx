import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[],
  selectedTodo: Todo | null,
  onSelectedTodoChange: (arg: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelectedTodoChange,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      {todos.length > 0 && (
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
      )}

      <tbody>
        {todos.map(todo => {
          return (
            <TodoInfo
              todo={todo}
              selectedTodo={selectedTodo}
              onSelectedTodoChange={onSelectedTodoChange}
            />
          );
        })}
      </tbody>
    </table>
  );
};
