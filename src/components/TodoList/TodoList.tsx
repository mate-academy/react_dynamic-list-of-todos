/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoModal } from '../TodoModal';
import { getUser } from '../../api';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  const handler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const loadedUser = await getUser(+event.currentTarget.name);

    setUser(loadedUser);

    setIsSelected(true);
    // loading();
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
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{todo.userId}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                name={`${todo.userId}`}
                data-cy="selectButton"
                className="button"
                type="button"
                // onClick={() => handler(event)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}

        {isSelected && (
          <TodoModal user={user} />)}

        {/* {console.log(getUser(selectedUserId))} */}

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
        </tr> */}
        {/* <tr data-cy="todo" className="has-background-info-light">
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
        </tr> */}

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
        </tr> */}

        {/* <tr data-cy="todo" className="">
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
