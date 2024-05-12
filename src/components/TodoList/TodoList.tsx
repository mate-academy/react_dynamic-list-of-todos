/* eslint-disable react/jsx-key */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  setCurrentModal: React.Dispatch<Todo>;
  currentModal: Todo;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setCurrentModal,
  currentModal,
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
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            setCurrentModal={setCurrentModal}
            currentModal={currentModal}
          />
        ))}
      </tbody>
    </table>
  );
};
