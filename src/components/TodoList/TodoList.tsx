import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/todocontext';

export const TodoList: React.FC = () => {
  const [todoEyeSelected, setTodoEyeSelected] = useState<number | null>(null);
  const context = useContext(TodoContext);
  const {
    filtred,
    handleShowTodo,
    isModalOpen,
  } = context;

  const handleSelectEye = (eye: number) => {
    setTodoEyeSelected(eye);
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
        {filtred.map(f => (
          <tr data-cy="todo" key={f.id} >
            <td className="is-vcentered">{f.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i
                  className={classNames('fas', {
                    'fa-check': f.completed,
                  })}
                ></i>
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  {
                    'has-text-danger': !f.completed,
                  },
                  { 'has-text-success': f.completed}
                )}
              >
                {f.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  handleShowTodo({id:f.id, userId: f.userId})
                  handleSelectEye(f.id);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': todoEyeSelected !== f.id || !isModalOpen, // se o olho que eu clicar tiver o id igual da tarefa(false)
                      'fa-eye-slash': todoEyeSelected === f.id && isModalOpen,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
