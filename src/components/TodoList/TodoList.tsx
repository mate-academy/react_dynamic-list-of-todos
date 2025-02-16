import React, { useContext, useState } from 'react';
import { ButtonContext } from '../../context/ButtonContext';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  const { isPressed, setIsPressed } = useContext(ButtonContext);
  const { setTodo } = useContext(TodoContext);
  const [todoIdPressed, setTodoIdPressed] = useState(0);

  function handleButtonClick(todoSelected: Todo) {
    setIsPressed(true);
    setTodoIdPressed(todoSelected.id);
    getUser(todoSelected.userId).then(user => {
      setTodo({ ...todoSelected, user });
    });
  }

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
        {todoList.map(eachTodo => (
          <tr
            key={eachTodo.id}
            data-cy="todo"
            className={
              eachTodo.id === todoIdPressed && isPressed
                ? 'has-background-info-light'
                : ''
            }
          >
            <td className="is-vcentered">{eachTodo.id}</td>
            <td className="is-vcentered">
              {eachTodo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={`${eachTodo.completed ? 'has-text-success' : 'has-text-danger'}`}
              >
                {eachTodo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleButtonClick(eachTodo)}
              >
                <span className="icon">
                  <i
                    className={`far ${eachTodo.id === todoIdPressed && isPressed ? 'fa-eye-slash' : 'fa-eye'}`}
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
