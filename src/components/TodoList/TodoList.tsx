import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  handleEditItem: (id: number) => void;
  editItem: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleEditItem,
  editItem,
}: Props) => (
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
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleEditItem={handleEditItem}
          isSelected={todo.id === editItem?.id}
        />
      ))}
    </tbody>
  </table>
);
