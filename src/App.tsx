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
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      return (
        selectedCategory === 'all' ||
        (selectedCategory === 'active' && !todo.completed) ||
        (selectedCategory === 'completed' && todo.completed)
      );
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {selectedTodo && (
                <TodoModal
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}

              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
