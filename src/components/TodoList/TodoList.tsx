import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  modalTodo: (userId: number, todoId: number, todoTitle: string) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  modalTodo,
  selectedTodoId,
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
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className={todo.completed ? 'fas fa-check' : 'fas'} />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => modalTodo(todo.userId, todo.id, todo.title)}
              >
                <i
                  className={
                    selectedTodoId === todo.id ? 'fas fa-eye' : 'far fa-eye'
                  }
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
