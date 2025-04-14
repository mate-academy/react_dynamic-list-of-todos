import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedToDo: Todo | null;
  onFocus: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedToDo = null,
  onFocus,
}) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(
    selectedToDo?.id || null,
  );

  useEffect(() => {
    setSelectedTodoId(selectedToDo?.id || null);
  }, [selectedToDo]);

  const handleToggleSelect = (todo: Todo) => {
    const isSelected = selectedTodoId === todo.id;

    setSelectedTodoId(isSelected ? null : todo.id);
    onFocus(isSelected ? null : todo); // Pass null if unselected
  };

  return (
    <>
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
            <th>V</th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-light': selectedTodoId === todo.id,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    `${todo.completed ? 'has-text-success' : 'has-text-danger'}`,
                  )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className={classNames('button', {
                    'is-primary': selectedTodoId === todo.id,
                  })}
                  type="button"
                  onClick={() => handleToggleSelect(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': selectedTodoId !== todo.id,
                        'fa-eye-slash': selectedTodoId === todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
          {/* <tr data-cy="todo" className="">
            <td className="is-vcentered">1</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">delectus aut autem</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
          <tr data-cy="todo" className="has-background-info-light">
            <td className="is-vcentered">2</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">
                quis ut nam facilis et officia qui
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo" className="">
            <td className="is-vcentered">1</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">delectus aut autem</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo" className="">
            <td className="is-vcentered">6</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">
                qui ullam ratione quibusdam voluptatem quia omnis
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo" className="">
            <td className="is-vcentered">8</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p className="has-text-success">quo adipisci enim quam ut ab</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};
