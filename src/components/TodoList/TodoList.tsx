import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../context';
import * as API from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

const ALL = 'all';
const ACTIVE = 'active';
const COMPLETED = 'completed';

export const TodoList: React.FC = () => {
  const {
    todos,
    todo,
    setTodo,
    setUser,
    setShowModal,
    setLoading,
    status,
    searchField,
  } = useContext(TodoContext);

  const [filterTodos, setFilterTodos] = useState(todos);
  // 'fa-eye fa-eye-slash'

  useEffect(() => {
    if (Object.keys(todo).length) {
      API.getUser(todo.userId)
        .then((userItem: User) => {
          setUser(userItem);
          setLoading(false);
        });
    }
  }, [todo, setUser, setLoading]);

  useEffect(() => {
    let filteredTodos: Todo[] = [];

    switch (status) {
      case ACTIVE:
        filteredTodos = todos.filter(item => !item.completed);
        break;

      case COMPLETED:
        filteredTodos = todos.filter(item => item.completed);
        break;

      case ALL:
      default:
        filteredTodos = todos;
        break;
    }

    setFilterTodos(filteredTodos
      .filter(item => item.title.includes(searchField)));
  }, [status, searchField, todos]);

  const handleSelectButtonClick = (
    // event: React.MouseEvent,
    todoItem: Todo,
  ) => {
    setShowModal(true);
    setTodo(todoItem);
    setLoading(true);
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
        {filterTodos.map(todoItem => {
          const {
            id,
            title,
            completed,
          } = todoItem;

          return (
            <tr key={id} data-cy="todo">
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectButtonClick(todoItem)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
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
  );
};
