import React, { useEffect, useState } from 'react';
import { getTodos, getTodosActive, getTodosComplited } from '../../api';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  sortType: string;
  query: string;
};

export const TodoList: React.FC<Props> = ({ sortType, query }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false; // Флаг для отмены асинхронных операций

    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        let fetchedTodos: Todo[] = [];

        switch (sortType) {
          case 'all':
            fetchedTodos = await getTodos();
            break;
          case 'active':
            fetchedTodos = await getTodosActive();
            break;
          case 'completed':
            fetchedTodos = await getTodosComplited();
            break;
          default:
            break;
        }

        // Применяем фильтр поиска
        if (query) {
          fetchedTodos = fetchedTodos.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        if (!isCancelled) {
          setTodos(fetchedTodos);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchTodos();

    // Отмена операции, если компонент размонтирован
    return () => {
      isCancelled = true;
    };
  }, [sortType, query]); // Зависимости: обновляется при изменении sortType и query

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
        {isLoading ? (
          <tr>
            <td colSpan={4}>
              <Loader />
            </td>
          </tr>
        ) : (
          todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)
        )}
      </tbody>
    </table>
  );
};
