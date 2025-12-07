import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { TodoRow } from '../Todo/Todo';

type Props = {
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos, setSelectedTodo, selectedTodo }) => {
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
        {todos.map((todo: Todo) => {
          return (
            <TodoRow
              todo={todo}
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
            />
          );
        })}
      </tbody>
    </table>
  );
};
