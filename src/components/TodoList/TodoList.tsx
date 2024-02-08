import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setModalTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>,
  modalTodo: Todo | undefined,
};

export const TodoList: React.FC<Props> = ({
  todos, setModalTodo, modalTodo,
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
          const todoTitleClass = cn({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          });

          const eyeClass = cn('far', {
            'fa-eye-slash': modalTodo?.id === todo.id,
            'fa-eye': modalTodo?.id !== todo.id,
          });

          const selectTodoHandler = (todoForModal:Todo) => {
            setModalTodo(todoForModal);
          };

          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todoTitleClass}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodoHandler(todo)}
                >
                  <span className="icon">
                    <i className={eyeClass} />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
