import React from 'react';
import { Todo } from '../Todo/Todo';
import { Todo as TodoType } from '../../types/Todo';

interface Props {
  todos: TodoType[];
  onSelect: (id: number) => void;
  selectedTodoId: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
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
            <Todo
              key={todo.id}
              todo={todo}
              onSelect={onSelect}
              isSelected={isSelected}
            />
          );
        })}

      </tbody>
    </table>
  );
};
