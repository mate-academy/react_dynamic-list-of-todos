/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getActive, getComplited, getTodos } from './api';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoFilter, setTodoFilter] = useState<string>('all');
  const [todoSearch, setTodoSearch] = useState<string>('');

  useEffect(() => {
    getTodos().then((data) => {
      setOriginalTodos(data);
      setTodos(data);
    });
  }, []);

  useEffect(() => {
    switch (todoFilter) {
      case 'all':
        setTodos(originalTodos.filter((todo) => todo.title.toLowerCase().includes(todoSearch)));
        break;
      case 'completed':
        getComplited().then((completedTodos) => {
          setTodos(completedTodos.filter((todo) => todo.title.toLowerCase().includes(todoSearch)));
        });
        break;
      case 'active':
        getActive().then((activeTodos) => {
          setTodos(activeTodos.filter((todo) => todo.title.toLowerCase().includes(todoSearch)));
        });
        break;
      default:
        break;
    }
  }, [todoFilter, todoSearch, originalTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoFilter={todoFilter}
                setTodoFilter={setTodoFilter}
                todoSearch={todoSearch}
                setTodoSearch={setTodoSearch}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  onTodoSelected={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
