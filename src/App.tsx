import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const [isTodoLoading, setIsTodoLoading] = useState(false);

  useEffect(() => {
    setIsTodoLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setTodos([]))
      .finally(() => setIsTodoLoading(false));
  }, []);

  const selectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      const isTitleIncludesQuery = normalizedTitle.includes(normalizedQuery);

      switch (searchBy) {
        case 'completed':
          return todo.completed && isTitleIncludesQuery;

        case 'active':
          return !todo.completed && isTitleIncludesQuery;

        case 'all':
          return isTitleIncludesQuery;

        default:
          return isTitleIncludesQuery;
      }
    });
  }, [query, todos, searchBy]);

  const selectedTodo = useMemo(() => {
    return todos.find(
      todo => todo.id === selectedTodoId,
    );
  }, [selectedTodoId, todos]);

  const unselectUser = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
              />
            </div>

            <div className="block">
              {!isTodoLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelect={selectTodoId}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeTodoModal={unselectUser}
        />
      )}
    </>
  );
};
