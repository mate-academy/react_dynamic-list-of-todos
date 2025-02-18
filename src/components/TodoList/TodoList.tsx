import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  filteredTodos: Todo[] | null | undefined;
  setSelectedTask: (taskId: number) => void;
  selectedTask: number | null;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setSelectedTask,
  selectedTask,
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
        {filteredTodos?.map(todo => {
          const toggleModal = cn(
            todo.id === selectedTask ? 'far fa-eye-slash' : 'far fa-eye',
          );
          const textCompletionColor = cn(
            todo.completed ? 'has-text-success' : 'has-text-danger',
          );

          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className={'fas fa-check'} />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={textCompletionColor}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => setSelectedTask(todo.id)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className={toggleModal} />
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
