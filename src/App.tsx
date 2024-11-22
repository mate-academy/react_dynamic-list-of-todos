/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getAllTodo } from './services/allTodo';
import { getCompletedTodo } from './services/completedTodo';
import { getActiveTodo } from './services/activeTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [optionsValue, setOptionsValue] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = useMemo(() => {
    return [...todos].filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [todos, inputValue]);

  useEffect(() => {
    setLoading(true);

    if (optionsValue === 'all') {
      getAllTodo()
        .then(setTodos)
        .finally(() => setLoading(false));
    } else if (optionsValue === 'active') {
      getActiveTodo()
        .then(setTodos)
        .finally(() => setLoading(false));
    } else if (optionsValue === 'completed') {
      getCompletedTodo()
        .then(setTodos)
        .finally(() => setLoading(false));
    }
  }, [optionsValue]);

  function handleCloseButton() {
    setSelectedTodo(null);
  }

  function handleSelectedTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setOptionsValue={setOptionsValue}
                setInputValue={setInputValue}
                inputValue={inputValue}
              />
            </div>
            {loading && <Loader />}

            <div className="block">
              {!loading && todos.length > 0 && (
                <TodoList
                  filteredTodos={filteredTodos}
                  handleSelectedTodo={handleSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
            {selectedTodo && (
              <TodoModal
                handleCloseButton={handleCloseButton}
                selectedTodo={selectedTodo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
