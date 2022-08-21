import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onTodoSelected: (todo: Todo) => void;
  toogleModal: () => void;
  isModalVisible: boolean,
  selectedTodo: Todo,
};

export const TodoList: React.FC<Props> = ({
  todos, onTodoSelected, toogleModal, isModalVisible, selectedTodo,
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
          <tr
            data-cy="todo"
            key={todo.id}
            className={(todo === selectedTodo && isModalVisible)
              ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
              && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={todo.completed ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onTodoSelected(todo);
                  toogleModal();
                }}
              >
                <span className="icon">
                  {!isModalVisible
                    ? (<i className="far fa-eye-slash" />)
                    : (<i className="far fa-eye" />)}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
