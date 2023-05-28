import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo[]
  showTodos: (todo: Todo) => void
  selectedId: Todo | null
};

export const TodoList: React.FC<Props> = ({ todo, showTodos, selectedId }) => {
  const isTodoSelected = (id: number) => selectedId?.id === id;

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
        {todo.map(list => (
          <tr
            data-cy="todo"
            key={list.id}
            className={classNames('',
              { 'has-background-info-light': isTodoSelected(list.id) })}
          >
            <td className="is-vcentered">{list.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className={classNames('fas',
                  { 'fa-check': list.completed })}
                />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              {
                !list.completed
                  ? (
                    <p className="has-text-danger">{list.title}</p>
                  )
                  : (
                    <p className="has-text-success">{list.title}</p>
                  )
              }
            </td>
            <td className="has-text-right is-vcentered">
              {
                isTodoSelected(list.id)
                  ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  )
                  : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => showTodos(list)}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  )
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* <tbody>
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
  </tr>
</tbody> */
