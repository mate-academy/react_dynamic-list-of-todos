import React from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { PrepaparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  setTodo: (todo: PrepaparedTodo | null) => void;
  isOpen: boolean;
  onOpen: (todoModal: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodo,
  isOpen,
  onOpen,
}) => {
  const handleTodoOpen = (todo: Todo) => {
    onOpen(true);
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
            todoModal={isOpen}
            handleTodoOpen={handleTodoOpen}
          />
        ))}
      </tbody>
    </table>
  );
};
