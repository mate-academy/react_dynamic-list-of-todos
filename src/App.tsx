/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedTodoId(null);
  };

  const selectedTodo: Todo | null = todos.find(todo => (
    todo.id === selectedTodoId
  )) || null;

  const handleSelectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const handleSearchQuery = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };

  const todosFilter = (currentTodos: Todo[]) => {
    switch (selectQuery) {
      case 'all':
        return currentTodos;
      case 'active':
        return currentTodos.filter(todo => !todo.completed);
      case 'completed':
        return currentTodos.filter(todo => todo.completed);
      default:
        return currentTodos;
    }
  };

  const visibleTodos = todos.filter(todo => todo.title.includes(searchQuery));

  const filteredTodos = todosFilter(visibleTodos);

  const handleSelecthQuery = (query: React.SetStateAction<string>) => {
    setSelectQuery(query);
  };

  const loadTodos = () => {
    getTodos().then(setTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleSearchQuery={handleSearchQuery} handleSelectQuery={handleSelecthQuery} />
            </div>

            <div className="block">
              {todos.length < 1 ? <Loader />
                : <TodoList selectedTodoId={selectedTodoId} todos={filteredTodos} handleSelectTodo={handleSelectTodoId} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} handleClose={handleClose} />}
    </>
  );
};
