import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  handleTodoClick: (todo: Todo) => void;
  handleClose: () => void;
  handleIconClick: (todoId: number) => void;
  activeTodoId: number | null;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleTodoClick,
  handleIconClick,
  activeTodoId,
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
        {todos.map((todo: Todo) => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={`${todo.completed ? 'has-text-success' : 'has-text-danger'} `}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => handleTodoClick(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon" onClick={() => handleIconClick(todo.id)}>
                  {activeTodoId === todo.id ? (
                    <i className={'far fa-eye-slash'} />
                  ) : (
                    <i className={'far fa-eye'} />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
