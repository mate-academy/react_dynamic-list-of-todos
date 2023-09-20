/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type ListOfTodos = {
  todoList: Todo[],
  modalActive: (todo: Todo) => void;
  query: string;
  option: boolean | null;
  activeTaskId: number | null;
};

const filteredTodosList = (value: string, todos: Todo[]) => todos.filter(todo => todo.title
  .toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()));

const filterTodosByOption = (todos: Todo[], option: boolean | null) => {
  if (option === null) {
    return todos;
  }

  return todos.filter(todo => todo.completed === (option === true));
};

export const TodoList: React.FC<ListOfTodos> = ({
  todoList, modalActive, query, option, activeTaskId,
}) => {
  const isDoneStyle = (isDone: boolean) => {
    return classNames({
      'has-text-danger': !isDone,
      'has-text-success': isDone,
    });
  };

  const filteredTodos = filterTodosByOption(filteredTodosList(query, todoList), option);

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
        {filteredTodos.map(todo => (
          <React.Fragment key={todo.id}>
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : <td className="is-vcentered" />}
              <td className="is-vcentered is-expanded">
                <p className={isDoneStyle(todo.completed)}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => modalActive(todo)}
                >
                  <span className="icon">
                    {activeTaskId === todo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
