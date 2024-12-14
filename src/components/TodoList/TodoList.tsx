import React, { useRef } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  onTodo: (u: Todo) => void;
  onCurrentIcon: (v: HTMLElement | null) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onTodo, onCurrentIcon }) => {
  const iconRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  const handleChangeTodo = (id: number) => {
    const todo = todos.find(elem => elem.id === id);

    if (todo) {
      onTodo(todo);
      if (iconRefs.current[id]) {
        onCurrentIcon(iconRefs.current[id]);
        iconRefs.current[id]?.classList.replace('fa-eye', 'fa-eye-slash');
      }
    }
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
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
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
                onClick={() => handleChangeTodo(todo.id)}
              >
                <span className="icon">
                  <i
                    ref={el => (iconRefs.current[todo.id] = el)}
                    className="far fa-eye"
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
          <p className="has-text-danger">quis ut nam facilis et officia qui</p>
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
  );
};
