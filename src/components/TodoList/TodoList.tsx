import React from 'react';

import { Todo } from '../../types';

import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  selectedUser: Todo | null;
  openTodoModal: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUser,
  openTodoModal,
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
      {todos.map(todo => {
        const isSelected = selectedUser && selectedUser.id === todo.id;

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={isSelected}
            openTodoModal={openTodoModal}
          />
        );
      })}
    </tbody>
  </table>
);
