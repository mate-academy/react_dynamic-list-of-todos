/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const visibleTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    switch (filterType) {
      case 'all':
        return todos.filter(todo => todo.title.toLowerCase().includes(lowerCaseQuery));

      case 'completed':
        return todos.filter(todo => todo.completed && todo.title.toLowerCase().includes(lowerCaseQuery));

      case 'active':
        return todos.filter(todo => !todo.completed && todo.title.toLowerCase().includes(lowerCaseQuery));

      default:
        return todos;
    }
  }, [todos, query, filterType]);

  const selectedTodo = todos.find(todo => todo.id === userId);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setTodos(await getTodos());
      } catch (error) {
        throw new Error('Error while loading todos');
      }
    };

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
                value={query}
                onReset={() => setQuery('')}
                setQuery={setQuery}
                setFilterType={(filter) => setFilterType(filter)}
                filterType={filterType}
              />
            </div>

            <div className="block">
              {
                todos.length > 0
                  ? (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodoId={userId}
                      selectTodo={(id) => setUserId(id)}
                    />
                  )
                  : (
                    <Loader />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo && (
          <TodoModal
            selectedTodo={selectedTodo}
            selectTodo={(id) => setUserId(id)}
          />
        )
      }
    </>
  );
};
