import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[],
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  activeTodo: Todo | null
}

export const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const {
    todos,
    setIsOpenModal, setActiveTodo,
    activeTodo,
  } = props;

  const openTodoModal = (todo: Todo) => {
    setIsOpenModal(true);
    setActiveTodo(todo);
  };

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
        {todos.map((todo) => {
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
                <p className={`has-text-${!todo.completed ? 'danger' : 'success'}`}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                {activeTodo?.id === todo.id ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => openTodoModal(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
