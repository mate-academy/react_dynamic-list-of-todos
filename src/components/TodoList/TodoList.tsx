import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  handleSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

const TodoItem: React.FC<{
  todo: Todo; handleSelect: () => void; selectedTodo: Todo | null
}> = ({
  todo,
  handleSelect,
  selectedTodo,
}) => (
  <tr key={todo.id} data-cy="todo">
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered">
      {todo.completed && (
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      )}
    </td>
    <td className="is-v centered is-expanded">
      <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
        {todo.title}
      </p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={handleSelect}
      >
        <span className="icon">
          {todo.id === selectedTodo?.id ? (
            <i className="far fa-eye-slash" />
          ) : (
            <i className="far fa-eye" />
          )}
        </span>
      </button>
    </td>
  </tr>
);

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleSelectedTodo,
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
        <TodoItem
          key={todo.id}
          todo={todo}
          handleSelect={() => handleSelectedTodo(todo)}
          selectedTodo={selectedTodo}
        />
      ))}
    </tbody>
  </table>
);
