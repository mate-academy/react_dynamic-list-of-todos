import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  options: string;
  query: string;
  setShow: React.Dispatch<React.SetStateAction<Todo | null>>;
  show: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  options,
  query,
  setShow,
  show,
}) => (
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
      {
        todos
        && todos
          .filter(el => {
            switch (options) {
              case 'active':
                return !el.completed;
                break;
              case 'completed':
                return el.completed;
                break;
              default:
                return el;
                break;
            }
          })
          .filter(el => el.title.includes(query))
          .map(el => (
            <tr
              data-cy="todo"
              className=""
              key={el.id}
            >
              <td className="is-vcentered">{el.userId}</td>
              {
                el.completed
                  ? (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td className="is-vcentered" />
                  )
              }
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    el.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {el.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setShow(el);
                  }}
                >
                  {
                    show !== el
                      ? (
                        <span className="icon">
                          <i className="far fa-eye" />
                        </span>
                      ) : (
                        <span className="icon">
                          <i className="far fa-eye-slash" />
                        </span>
                      )
                  }
                </button>
              </td>
            </tr>
          ))
      }
    </tbody>
  </table>
);
