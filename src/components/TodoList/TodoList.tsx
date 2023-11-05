import React, { } from 'react';
import { Todo } from '../../types/Todo';
import { TableRowTodo } from '../TableRowTodo';
import { HandleClickParams } from '../../types/HandleClickParams';

type Props = {
  todos: Todo[];
  setIsVisibleModal: (value: boolean) => void;
  setUserId: (id: number) => void;
  setSelectedTodo: (todo: Todo) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsVisibleModal,
  setUserId,
  setSelectedTodo,
  selectedTodoId,
}) => {
  function handleSelectTodo(values: HandleClickParams) {
    const {
      boolean,
      userId,
      todo,
    } = values;

    setIsVisibleModal(boolean);
    setUserId(userId);
    setSelectedTodo(todo);
  }

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
          <TableRowTodo
            todo={todo}
            key={todo.id}
            selectedTodoId={selectedTodoId}
            // eslint-disable-next-line react/jsx-no-bind
            handleSelectTodo={handleSelectTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
