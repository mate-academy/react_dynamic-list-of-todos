import React, { useEffect, useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { TodoModal } from '../TodoModal';
import { Loader } from '../Loader';
import { TodoItem } from '../TodoItem';

export interface TodoListProps {
  todoQuery: string;
  todoSearchQuery: string;
}

enum StatusQuery {
  Completed = 'completed',
  Active = 'active',
}

export const TodoList: React.FC<TodoListProps> = ({
  todoQuery,
  todoSearchQuery,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = (
    allTodos: Todo[],
    query: string,
    searchInput: string,
  ) => {
    let filteredTodos = [...allTodos];

    if (query === StatusQuery.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (query === StatusQuery.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (searchInput) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    return filteredTodos;
  };

  const visibleTodos = useMemo(
    () => filterTodos(todos, todoQuery, todoSearchQuery),
    [todos, todoQuery, todoSearchQuery],
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {visibleTodos.map(todo => (
              <TodoItem
                todoItem={todo}
                setSelectTodo={setSelectTodo}
                selectTodo={selectTodo}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      )}
      {selectTodo && (
        <TodoModal selectedTodo={selectTodo} setSelectTodo={setSelectTodo} />
      )}
    </>
  );
};
