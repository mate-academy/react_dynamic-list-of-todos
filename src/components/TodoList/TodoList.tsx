import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  handleSelectTodo: (todo: Todo) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleSelectTodo,
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
      {todos.map(todo => {
        const { id } = todo;
        const selected = selectedTodo !== null && selectedTodo.id === id;

        return (
          <TodoItem
            key={id}
            todo={todo}
            handleSelectTodo={handleSelectTodo}
            selected={selected}
          />
        );
      })}
    </tbody>
  </table>
);
