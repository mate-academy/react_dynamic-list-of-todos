/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [selectedField, setSelectedField] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const getTodoById = (id: number) => {
    return todos.find(todo => todo.id === id) || null;
  };

  const handleTodoId = (id: number) => {
    setTodoId(id);
  };

  const handleUserId = (id: number) => {
    setUserId(id);
  };

  const handleField = (field: string) => {
    setSelectedField(field);
  };

  const handleQuery = (description: string) => {
    setQuery(description);
  };

  let visibleTodos = [...todos];

  if (selectedField === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (selectedField === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerQuery)));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedField={selectedField}
                onSelectField={handleField}
                onQuery={handleQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  todoId={todoId}
                  onSelectTodo={handleTodoId}
                  onSelectUser={handleUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {todoId !== 0 && (
        <TodoModal
          userId={userId}
          todo={getTodoById(todoId)}
          onClose={handleTodoId}
        />
      )}

    </>
  );
};
