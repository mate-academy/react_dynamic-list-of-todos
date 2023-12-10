import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  todos: Todo[];
  filter: FilterBy;
  query: string;
  selectedTodo: Todo | null,
  onSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  query,
  selectedTodo,
  onSelectedTodo,
}) => {
  const filteredTodos = () => {
    switch (filter) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const todosToRender = () => filteredTodos()
    .filter(todo => {
      return todo.title.toLowerCase()
        .includes(query.toLowerCase().trim());
    });

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
        {todosToRender().map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            selectedTodo={selectedTodo}
            onSelectedTodo={onSelectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
