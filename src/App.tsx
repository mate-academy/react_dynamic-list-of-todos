/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [option, setOption] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => `${error} error in TODO's data`)
      .finally(() => setIsLoading(false));
  }, []);

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = todos.filter(todo => {
    const input = todo.title.toLowerCase().includes(inputValue.toLowerCase().trim());

    switch (option) {
      case 'active':
        return input && !todo.completed;
      case 'completed':
        return input && todo.completed;
      default:
        return input;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setInputValue={setInputValue}
                inputValue={inputValue}
                option={option}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onTodoSelect={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} handleModalClose={handleModalClose} />
      )}
    </>
  );
};
