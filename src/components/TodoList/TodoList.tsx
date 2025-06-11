import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  setEyeWasPressed: (val: boolean) => void;
  visibleTodos: Todo[];
  setChosenTodo: (todo: Todo) => void;
  eyeWasPressed: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  visibleTodos,
  setEyeWasPressed,
  setChosenTodo,
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
        {visibleTodos.map(todo => {
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
                  onClick={ev => {
                    setChosenTodo(todo);
                    setEyeWasPressed(true);

                    const pressedButton = ev.currentTarget as HTMLButtonElement;

                    const eyeElem = pressedButton.querySelector(
                      '.far',
                    ) as HTMLElement;

                    eyeElem.classList.toggle('fa-eye');
                    eyeElem.classList.toggle('fa-eye-slash');
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
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
