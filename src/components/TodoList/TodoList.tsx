import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/index';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedTodo,
  onTodoSelect,
}) => {
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
        {
          todos.map(todo => {
            const { id } = todo;

            const isSelectedTodo = todo.id === selectedTodo?.id;

            return (
              <TodoItem
                key={id}
                todo={todo}
                onTodoSelect={onTodoSelect}
                todoStatus={isSelectedTodo}
              />
            );
          })
        }
      </tbody>
    </table>
  );
});
