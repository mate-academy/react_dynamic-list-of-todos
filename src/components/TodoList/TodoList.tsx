import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  onShowModal: (v: boolean) => void,
  onSetSelectedTodoId: (number: number) => void,
  selectedTodoId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShowModal,
  onSetSelectedTodoId,
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
        {todos.map((todo) => {
          const isActive = selectedTodoId === todo.id;

          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              isActive={isActive}
              onSetSelectedTodoId={onSetSelectedTodoId}
              onShowModal={onShowModal}
            />
          );
        })}
      </tbody>
    </table>
  );
};
