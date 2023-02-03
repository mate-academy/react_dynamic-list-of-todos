/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
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
  const [status, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos().then(todo => setTodos(todo));
  }, []);

  const visibleTodos = useMemo(() => todos.filter(todo => {
    const isQueryMatch = todo.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
    let selectedFilterStatus = true;

    switch (status) {
      case 'active':
        selectedFilterStatus = !todo.completed;
        break;

      case 'completed':
        selectedFilterStatus = todo.completed;
        break;

      default:
        selectedFilterStatus = true;
    }

    return isQueryMatch && selectedFilterStatus;
  }), [todos, status, searchQuery]);

  const selectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = useMemo(() => visibleTodos.find(todo => (
    todo.id === selectedTodoId
  )), [selectedTodoId, visibleTodos]);

  const closeSelectedTodo = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const filterByQuery = (value: string) => {
    setSearchQuery(value);
  };

  const clearQuery = () => {
    setSearchQuery('');
  };

  const selectStatus = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                filter={filterByQuery}
                onSearch={clearQuery}
                onSelectStatus={selectStatus}
                status={status}
              />
            </div>

            <div className="block">
              {!todos.length
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectedTodoId={selectTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={closeSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
