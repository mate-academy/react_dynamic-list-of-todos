import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onShow: (todo: Todo) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onShow,
}) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({ 'has-background-info-light': index % 2 === 1 })}
          >
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td
              className={cn({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.completed ? 'Done' : 'Planned'}
            </td>
            <td>
              <i
                className={cn('far', {
                  'fa-eye-slash': selectedTodo?.id === todo.id,
                  'fa-eye': selectedTodo?.id !== todo.id,
                })}
                onClick={() => onShow(todo)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
