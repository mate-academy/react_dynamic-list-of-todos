import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<null | Todo>>;
  selectedFilter: string;
  selectedQuery: string;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedFilter,
  selectedQuery,
  selectedTodo,
}) => {
  const filterList = (filterProp: string, todosList: Todo[]) => {
    switch (filterProp) {
      case 'all':
        return todosList.filter(todo => (todo.completed || !todo.completed)
          && todo.title.includes(selectedQuery.toLowerCase()));

      case 'completed':
        return todosList.filter(todo => todo.completed
          && todo.title.includes(selectedQuery.toLowerCase()));

      case 'active':
        return todosList.filter(todo => !todo.completed
          && todo.title.includes(selectedQuery.toLowerCase()));

      default:
        return todosList;
    }
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
        {filterList(selectedFilter, todos).map(todo => (
          <TodoItem
            todo={todo}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
