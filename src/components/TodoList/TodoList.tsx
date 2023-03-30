import React from 'react';
import { TodoEach } from '../Todo/TodoEach';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  chosenTodo: Todo | null,
  handleChosenTodo: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  handleChosenTodo,
  chosenTodo,
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
        {todos.map((todo) => (
          <TodoEach
            todo={todo}
            chosenTodo={chosenTodo}
            handleChosenTodo={handleChosenTodo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
});
