import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../context';
import { Todo } from '../../types/Todo';

const ALL = 'all';
const ACTIVE = 'active';
const COMPLETED = 'completed';

export const TodoList: React.FC = () => {
  const {
    getUserAPI,
    todos,
    todo,
    setTodo,
    setShowModal,
    setLoading,
    status,
    searchField,
  } = useContext(TodoContext);

  const [selectedTodo, setSelectedTodo] = useState(0);
  const [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    if (todo && Object.keys(todo).length) {
      getUserAPI(todo.userId);
    } else {
      setSelectedTodo(0);
    }
  }, [todo, getUserAPI]);

  useEffect(() => {
    let filteredTodos: Todo[] | null = [];

    if (todos) {
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
    }

    setFilterTodos(filteredTodos
      .filter(item => item.title.toUpperCase().trim()
        .includes(searchField.toUpperCase().trim())));
  }, [status, searchField, todos]);

  const handleSelectButtonClick = (todoItem: Todo) => {
    setTodo(todoItem);
    setSelectedTodo(todoItem.id);
    setLoading(true);
    setShowModal(true);
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
        {filterTodos && filterTodos.map(todoItem => {
          const {
            id,
            title,
            completed,
          } = todoItem;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo === id,
              })}
            >
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
                    <i className={classNames('far',
                      {
                        'fa-eye': selectedTodo !== id,
                        'fa-eye-slash': selectedTodo === id,
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
