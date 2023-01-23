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
import { getFilteredTodos } from './getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .then(() => setIsLoading(false));
  }, []);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectTodoId) || null;
  }, [selectTodoId, todos]);

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, selectedFilter, searchQuery)
  ), [todos, selectedFilter, searchQuery]);

  const unselecedUser = useCallback(() => {
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
                selectedFilter={selectedFilter}
                searchQuery={searchQuery}
                onSelectedFilter={(filterType) => setSelectedFilter(filterType)}
                onSearchQuery={(query) => setSearchQuery(query)}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {todos.length > 0
                && (
                  <TodoList
                    todos={visibleTodos}
                    onSelectTodo={(todoId) => setSelectedTodoId(todoId)}
                    selectTodoId={selectTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectTodoId !== 0
        && (
          <TodoModal
            todo={selectedTodo}
            onClose={unselecedUser}
          />
        )}
    </>
  );
};
