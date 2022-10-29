/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('all');

  useEffect(() => {
    getTodos().then(shownTodos => setTodos(shownTodos));
  }, []);

  const currentTodo = todos.find(todo => (
    todo.id === todoId
  ));

  const closeModal = () => {
    setTodoId(0);
  };

  const onQueryChange = (changedQuery: string) => {
    setQuery(changedQuery);
  };

  const onSelectChange = (changedSelect: string) => {
    setSelect(changedSelect);
  };

  const slectedByStatus = todos.filter(todo => {
    switch (select) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

  const visibleTodos = slectedByStatus.filter(todo => (
    todo.title.toLowerCase()
      .includes(query.toLowerCase())
  ));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={onQueryChange}
                onSelectChange={onSelectChange}
                query={query}
                select={select}
              />
            </div>

            <div className="block">
              {
                todos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodoId={todoId}
                      selectTodo={(id: number) => setTodoId(id)}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          onClose={closeModal}
        />
      )}
    </>
  );
};
