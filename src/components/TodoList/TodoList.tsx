import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoSelect,
  selectedTodo,
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
      {todos.map(todo => (
        // Кожен елемент у списку повинен мати унікальний `key`.
        // Тут ми використовуємо `todo.id`, оскільки він унікальний для кожної справи.
        <tr
          data-cy="todo"
          key={todo.id} // Додаємо key
          className={todo.completed ? 'has-background-info-light' : ''} // Додаємо клас, якщо todo виконано
        >
          <td className="is-vcentered">{todo.id}</td> {/* Відображаємо ID */}
          <td className="is-vcentered">
            {/* Умовне відображення іконки, якщо todo виконано */}
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            {/* Відображаємо заголовок todo */}
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
              onClick={() => onTodoSelect(todo)}
            >
              <span className="icon">
                {selectedTodo?.id === todo.id ? (
                  <i className="far fa-eye-slash" />
                ) : (
                  <i className="far fa-eye" />
                )}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
