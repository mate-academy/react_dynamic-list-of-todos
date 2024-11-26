import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<'' | Todo>>;
  selectedTodo: '' | Todo;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodo,
}) => {
  // console.log(todos);

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
      {todos.map((todo: Todo) => (
        <tbody key={todo.id}>
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className={todo.completed ? 'fas fa-check' : 'is-vcentered'} />
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setSelectedTodo(todo);
                }}
              >
                <span
                  className="icon"
                  {...(todo.completed ? { 'data-cy': 'iconCompleted' } : {})}
                >
                  <i
                    className={`far ${selectedTodo && selectedTodo.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
