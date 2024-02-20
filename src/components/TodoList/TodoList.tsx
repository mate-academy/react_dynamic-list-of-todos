import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
  modal: boolean;
  setModal: (a: boolean) => void;
};

export const TodoList: React.FC<Props> = ({ todos, modal, setModal }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setModal(true);
  };

  const handleIconClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: Todo,
  ) => {
    e.preventDefault();
    handleTodoClick(todo);
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light':
                modal && selectedTodo?.id === todo.id,
            })}
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
                onClick={e => handleIconClick(e, todo)}
              >
                <span className="icon" data-cy="iconCompleted">
                  <i
                    className={
                      selectedTodo?.id === todo.id && modal
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {selectedTodo && (
        <TodoModal
          modal={modal}
          userId={selectedTodo.userId}
          setModal={setModal}
          numberUser={selectedTodo.id}
        />
      )}
    </table>
  );
};
