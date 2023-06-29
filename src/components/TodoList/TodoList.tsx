import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodoId: number | undefined;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodoId,
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
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              setSelectedTodo={setSelectedTodo}
              isSelectedTodo={isSelected}
            />
          );
        })}

      </tbody>
    </table>
  );
};
