/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';
import { filterTodoByCompleted } from './helpers';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos().then(setTodosFromServer);
  }, []);

  const visibleTodos = useMemo(() => {
    let todos = todosFromServer;

    if (selectedFilter) {
      switch (selectedFilter) {
        case 'all':
          todos = todosFromServer;
          break;

        case 'active':
          todos = filterTodoByCompleted(todosFromServer, false);
          break;

        case 'completed':
          todos = filterTodoByCompleted(todosFromServer, true);
          break;

        default:
          todos = todosFromServer;
          break;
      }
    }

    if (searchQuery) {
      const currentQuery = searchQuery.toLowerCase();

      todos = todos.filter(todo => todo.title
        .toLowerCase().includes(currentQuery));
    }

    return todos;
  }, [selectedFilter, todosFromServer, searchQuery]);

  const selectedTodo = useMemo(() => (
    visibleTodos.find(todo => todo.id === selectedTodoId) || null
  ), [selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {todosFromServer.length === 0 && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                setSelectedTodoId={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
