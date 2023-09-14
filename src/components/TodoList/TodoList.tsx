import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoTask } from '../TodoTask';

type Props = {
  todos: Todo[] | null,
  selectedTodo: Todo | null,
  selectUser: (userId: number) => void,
  selectTodo: (todoId: number) => void,
  setModal: (status: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectUser,
  selectTodo,
  setModal,
}) => {
  const handleToggleModal = (
    userId: number,
    todoId: number,
    status: boolean,
  ) => {
    selectUser(userId);
    selectTodo(todoId);
    setModal(status);
  };

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
        {todos?.map(todo => (
          <TodoTask
            todo={todo}
            handleToggleModal={handleToggleModal}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
