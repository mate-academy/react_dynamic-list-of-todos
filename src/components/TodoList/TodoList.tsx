import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

type Props = {
  todos: Todo[];
  modalInfo: Todo | null;
  setModalInfo: (todoInfo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  modalInfo,
  setModalInfo,
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
    <TodoItem todos={todos} modalInfo={modalInfo} setModalInfo={setModalInfo} />
  </table>
);
