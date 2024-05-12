/* eslint-disable react/jsx-key */
import React from 'react';
import { TodoType } from '../../types/TodoType';
import { Todo } from '../Todo/Todo';

type Props = {
  todos: TodoType[];
  setCurrentModal: React.Dispatch<TodoType>;
  currentModal: TodoType;
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
          <Todo
            todo={todo as TodoType}
            setCurrentModal={setCurrentModal}
            currentModal={currentModal}
          />
        ))}
      </tbody>
    </table>
  );
};
