import React from 'react';
import { Todo } from '../../types/Todo';
import TodoCard from '../TodoCard/TodoCard';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo) => void;
  showModalWindow: (show: boolean) => void;
  isShowModal: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  showModalWindow,
  isShowModal,
  selectedTodo,
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
      {todos.map(todo => (
        <TodoCard
          todo={todo}
          selectTodo={selectTodo}
          selectedTodo={selectedTodo}
          showModalWindow={showModalWindow}
          isShowModal={isShowModal}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
