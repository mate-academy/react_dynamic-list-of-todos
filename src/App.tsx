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
  const [onShowModal, setOnShowModal] = React.useState<Todo | null>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [onClose,setOnClose] = React.useState(false);

  const handleModalClose = (shouldClose: boolean) => {
    setOnClose(shouldClose);
    if (!shouldClose) {
      setOnShowModal(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectStatus === 'active') {
      return !todo.completed;
    }

    if (selectStatus === 'completed') {
      return todo.completed;
    }

    return true;
  }).filter((todo) => todo.title.toLowerCase().includes(inputValue.toLowerCase()));

  useEffect(() => {
    setIsLoading(true); // Вмикаємо лоадер перед запитом

    getTodos()
      .then((data) => {
        setTodos(data); // Записуємо отримані завдання в стан todos
      })
      // (Опціонально) можна додати .catch для обробки помилок
      .finally(() => {
        setIsLoading(false); // Вимикаємо лоадер, коли запит завершився
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
                setSelectStatus={setSelectStatus}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setOnShowModal={setOnShowModal}
                  onClose={setOnClose}
                  selectedTodoId={onShowModal?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {onClose && onShowModal && (
        <TodoModal todo={onShowModal} onClose={handleModalClose} />
      )}
    </>
  );
};
