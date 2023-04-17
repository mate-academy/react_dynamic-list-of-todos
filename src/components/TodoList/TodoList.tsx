import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelected: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onTodoSelected,
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
        const { id, title, completed } = todo;
        const isSelectedTodo = selectedTodo === todo;

        return (
          <TodoComponent
            todo={todo}
            id={id}
            title={title}
            completed={completed}
            isSelectedTodo={isSelectedTodo}
            onTodoSelected={onTodoSelected}
            key={id}
          />
        );
      })}
    </tbody>
  </table>
);
