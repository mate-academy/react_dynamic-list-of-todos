/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [selectStatus, setSelectStatus] = React.useState('all');
  const [inputValue, setInputValue] = React.useState('');
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Створюємо іменовані обробники замість передачі setState напряму
  const handleStatusChange = (status: string) => {
    setSelectStatus(status);
  };

  const handleQueryChange = (query: string) => {
    setInputValue(query);
  };

  const handleClearQuery = () => {
    setInputValue('');
  };

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setIsModalOpen(false);
      setSelectedTodo(null);
    } else {
      setSelectedTodo(todo);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (selectStatus === 'active') {
        return !todo.completed;
      }

      if (selectStatus === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
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
                selectStatus={selectStatus}
                onStatusChange={handleStatusChange}
                inputValue={inputValue}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
