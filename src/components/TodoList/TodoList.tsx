import React from 'react';
import { TodoString } from '../TodoString';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  openModal: (todo: Todo, userId: number) => void;
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedTodo,
  openModal,
}) => {
  return (
    <div className="block">
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
            <TodoString
              key={todo.id}
              todo={todo}
              selectedTodo={selectedTodo}
              openModal={openModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
