import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setClickedPostId: (todoId: number) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setClickedPostId,
  selectedTodoId,
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
        const isSelected = todo.id === selectedTodoId;

        return (
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>

            {/* 1. Show completed icon only if todo is completed */}
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="completedIcon">
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
              {/* 2. Toggle between Show and Hide behavior */}
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  // If already selected, clicking "Hide" sets ID to 0
                  setClickedPostId(isSelected ? 0 : todo.id);
                }}
              >
                <span className="icon">
                  <i
                    className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
