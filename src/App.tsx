/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSelectTodo = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleQuery = useCallback((str: string) => {
    setQuery(str.toLowerCase());
  }, []);

  const deleteQuery = useCallback(() => setQuery(''), []);

  const handleFilter = useCallback((str: string) => setFilter(str), []);
  const closeModal = useCallback(() => setSelectedTodoId(0), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const getVisibleTodos = (
    todoOnPage: Todo[],
    queryOnPage: string,
    filterOnPage: string,
  ) => {
    if (filterOnPage !== 'all' || queryOnPage) {
      return todoOnPage.filter(todo => {
        const isIncluded = todo.title.toLowerCase().includes(query);
        let isCompleted;

        switch (filterOnPage) {
          case 'active':
            isCompleted = todo.completed === false;
            break;

          case 'completed':
            isCompleted = todo.completed === true;
            break;

          default:
            isCompleted = true;
            break;
        }

        return isIncluded && isCompleted;
      });
    }

    return todos;
  };

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, filter)
  ), [query, filter, todos]);

  useEffect(() => {
    async function fetchTodos() {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    }

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleQuery}
                onFilter={handleFilter}
                queryValue={query}
                filterValue={filter}
                deleteQuery={deleteQuery}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectedTodo={handleSelectTodo}
                />
              ) : (
                <Loader />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCancelModal={closeModal} />
      )}
    </>
  );
};
