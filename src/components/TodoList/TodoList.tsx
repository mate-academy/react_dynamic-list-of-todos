import React from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

function getTodos(todos: Todo[], query: string, filter: Filter): Todo[] {
  let newTodos = todos;

  if (query.trim()) {
    const normalizedQuery = query.trim().toLowerCase();

    newTodos = todos.filter(
      todo => todo.title.toLocaleLowerCase().includes(normalizedQuery),
    );
  }

  switch (filter) {
    case Filter.Active:
      return newTodos.filter(todo => !todo.completed);

    case Filter.Completed:
      return newTodos.filter(todo => todo.completed);

    default:
      return newTodos;
  }
}

type Props = {
  todos: Todo[];
  setTodo: (todo: Todo) => void;
  query: string;
  filter: Filter;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodo,
  query,
  filter,
  selectedTodo,
}) => {
  const preparedTodos = getTodos(todos, query, filter);

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
        {preparedTodos.map((todo, index) => (
          <TodoItem
            todo={todo}
            index={index}
            setTodo={setTodo}
            key={todo.id}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
