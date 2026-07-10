import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  // Функція приймає todo типу Todo і повертає void (нічого)
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onSelectTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>Status</th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => {
        const isSelected = selectedTodo?.id === todo.id;

        return (
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              {/* ТУТ ТЕКСТ З КЛАСОМ КОЛЬОРУ */}
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                // При кліку викликаємо функцію і передаємо їй поточний об'єкт todo
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  {/* Динамічно змінюємо клас іконки залежно від того, чи вибрано це конкретне завдання */}
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': isSelected,
                      'fa-eye': !isSelected,
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
