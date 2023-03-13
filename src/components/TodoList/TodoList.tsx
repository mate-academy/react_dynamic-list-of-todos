import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';
import { Filter } from '../../types/Filter';
import { filterTodo } from '../../api';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[],
  openModal: (id: number) => void,
  query: string,
  filter: Filter,
  selectedTodo: Todo | null,
  initialized: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  openModal,
  query,
  filter,
  selectedTodo,
  initialized,
}) => {
  const visibleTodos = filterTodo(todos, filter, query);

  return initialized
    ? (
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

        {visibleTodos.length && (
          <tbody>
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                openModal={openModal}
                selectedTodo={selectedTodo}
              />
            ))}
          </tbody>
        )}
      </table>
    ) : <Loader />;
};
