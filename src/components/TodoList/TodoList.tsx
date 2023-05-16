import React from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { PrepaparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  setTodo: (todo: PrepaparedTodo | null) => void;
  todoModal: boolean;
  setTodoModal: (todoModal: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodo,
  todoModal,
  setTodoModal,
}) => {
  const handleTodoOpen = (todo: Todo) => {
    setTodoModal(true);
    getUser(todo.userId).then(user => setTodo({
      ...todo,
      user,
    }));
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
        {todos.map(todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
            todoModal={todoModal}
            handleTodoOpen={handleTodoOpen}
          />
        ))}
      </tbody>
    </table>
  );
};
