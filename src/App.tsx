/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArraySelection = useMemo(() => {
    return todos.filter(todo => {
      const checkQuery = todo.title.toLowerCase().includes(searchQuery);

      switch (filteredBy) {
        case 'all':
          return checkQuery;
        case 'active':
          return checkQuery && !todo.completed;
        case 'completed':
          return checkQuery && todo.completed;
        default:
          return true;
      }
    });
  }, [todos, searchQuery, filteredBy]);

  const onClose = () => {
    setSelectedTodoId(0);
  };

  const todo = todos.find(element => element.id === selectedTodoId) || null;

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterSelected={setFilteredBy}
                textInput={setSearchQuery}
              />
            </div>

            <div className="block">
              {
                todos.length > 0
                  ? (
                    <TodoList
                      todos={filteredArraySelection}
                      onTodoSelect={setSelectedTodoId}
                      todoSelectedId={selectedTodoId}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId !== 0
        && (
          <TodoModal
            todo={todo}
            onClose={onClose}
          />
        )}
    </>
  );
};
