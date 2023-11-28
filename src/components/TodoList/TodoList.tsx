import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { FilterOption } from '../../types/FilterOption';

type Props = {
  setModel: (isOpen: boolean) => void,
};

export const TodoList: React.FC<Props> = ({ setModel }) => {
  const {
    todos,
    filterOption,
    query,
    selectedIdTodo,
    setSelectedIdTodo,
  } = useContext(TodoContext);

  const getVisibleTodos = () => {
    switch (filterOption) {
      case FilterOption.Active:
        return todos.filter(todo => !todo.completed
          && todo.title.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()));

      case FilterOption.Completed:
        return todos.filter(todo => todo.completed
          && todo.title.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()));

      case FilterOption.All:
        return todos.filter(todo => todo
          .title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

      default:
        return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  const handleClickSelectBtn = (id: number) => {
    setModel(true);
    setSelectedIdTodo(id);
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
        {
          visibleTodos.map(todo => (
            <tr
              data-cy="todo"
              className=""
              key={todo.id}
            >
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
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleClickSelectBtn(todo.id)}
                >
                  <span className="icon">
                    <i className={selectedIdTodo !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
