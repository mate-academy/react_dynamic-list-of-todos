import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onHandleModal: (todo: Todo) => void;
  selectedTodo: Todo | undefined,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onHandleModal = () => {},
  selectedTodo,
}) => {
  return (
    <table
      className="table is-narrow is-fullwidth"
    >
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
          <TodoItem
            todo={todo}
            onHandleModal={onHandleModal}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
