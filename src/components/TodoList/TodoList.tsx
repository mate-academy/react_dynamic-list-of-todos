import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/Todo';

type Props = {
  todos: Todo[];
  setChoiceTodo: (choiceTodo: Todo) => void;
  choiceTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setChoiceTodo,
  choiceTodo,
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
        {todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              choiceTodo={choiceTodo}
              setChoiceTodo={setChoiceTodo}
            />
          );
        })}
      </tbody>
    </table>
  );
};
