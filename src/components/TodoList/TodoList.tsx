import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  visibleTodos: Todo[],
  setSelectTodo: (todo: Todo) => void
  selectTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setSelectTodo,
  selectTodo,
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
        {visibleTodos.map((todo) => {
          const isSelectedTodo = todo.id === selectTodo?.id;

          return (
            <TodoItem
              setSelectTodo={setSelectTodo}
              isSelectedTodo={isSelectedTodo}
              todo={todo}
            />
          );
        })}
      </tbody>
    </table>
  );
};
