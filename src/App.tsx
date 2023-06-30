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

const filterTodos = (todos: Todo[], selectedOption: string, searchQuery: string) => {
  let preparedTodos = [...todos];

  if (searchQuery) {
    const preparedSearchQuery = searchQuery.toLowerCase().trim();

    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(preparedSearchQuery));
  }

  if (selectedOption === 'active') {
    preparedTodos = preparedTodos.filter(todo => !todo.completed);
  }

  if (selectedOption === 'completed') {
    preparedTodos = preparedTodos.filter(todo => todo.completed);
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } finally {
      setIsLoading(false);
    }
  };

  const isTodoSelected = (todoId: number) => todoId === selectedTodo?.id;

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = filterTodos(todos, selectedOption, searchQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {!isLoading
                ? <TodoList todos={visibleTodos} selectTodo={selectTodo} isTodoSelected={isTodoSelected} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
