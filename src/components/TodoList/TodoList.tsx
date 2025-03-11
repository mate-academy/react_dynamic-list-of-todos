import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  setSelectedId: (id: number) => void;
  activeModal: boolean;
  filteredTodos: Todo[];
  setActiveModal: (arg: boolean) => void;
  setSelectedToDo: (arg: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  setSelectedId,
  filteredTodos,
  activeModal,
  setActiveModal,
  setSelectedToDo,
}) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!activeModal) {
      setSelected(0);
    }
  }, [activeModal]);

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
        {filteredTodos &&
          filteredTodos.map(todo => {
            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light':
                    selected === todo.id && activeModal,
                })}
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
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
                    })}
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
                      setSelected(todo.id);
                      setSelectedToDo(todo);
                      setSelectedId(todo.id);
                      setActiveModal(true);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': selected !== todo.id,
                          'fa-eye-slash': selected === todo.id && activeModal,
                        })}
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
};
