import React from 'react';
import { useTodos } from '../../store/Store';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useTodos();

  const { id, completed, title } = todo;

  const select =
    selectedTodo?.id === todo.id ? 'has-background-info-light' : '';

  const handleChange = (todos: Todo | null) => () => {
    setSelectedTodo(todos);
  };

  return (
    <tr data-cy="todo" className={select} key={id}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={`${completed ? 'has-text-success' : 'has-text-danger'}`}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        {selectedTodo?.id === id ? (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={handleChange(null)}
          >
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        ) : (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={handleChange(todo)}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;
