import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodoId: React.Dispatch<React.SetStateAction<number>>,
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>,
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>,
  setUserId: React.Dispatch<React.SetStateAction<number>>,
  selectedTodo: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodoId,
  setTodoTitle,
  setCompleted,
  setUserId,
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
      {todos.map(todo => (
        <tr
          data-cy="todo"
          className=""
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={todo.completed
              ? 'has-text-success'
              : 'has-text-danger'}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {selectedTodo === todo.id ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setTodoId(0);
                }}
              >
                <span className="icon">
                  <i className="far fa-eyefar fa-eye-slash" />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setTodoId(todo.id);
                  setTodoTitle(todo.title);
                  setCompleted(todo.completed);
                  setUserId(todo.userId);
                }}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
