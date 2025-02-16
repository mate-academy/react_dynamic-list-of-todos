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

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    setIsModalShow(false);
    setSelectedTodo(null);
  };

  const handleRetry = () => {
    setErrorMessage('');
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  };

  if (errorMessage) {
    return (
      <div
        className="is-flex is-justify-content-center is-align-items-center"
        style={{
          minHeight: '100vh',
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          className="notification"
          style={{
            maxWidth: '600px',
            width: '100%',
            borderRadius: '20px',
            border: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            animation: 'slideIn 0.5s ease-out',
          }}
        >
          <div className="content has-text-centered">
            <div className="mb-4">
              <span
                className="icon is-large has-text-danger"
                style={{
                  animation: 'bounce 1s infinite',
                  filter: 'drop-shadow(0 2px 4px rgba(245, 56, 56, 0.3))',
                }}
              >
                <i className="fas fa-exclamation-triangle fa-2x"></i>
              </span>
            </div>

            <h2
              className="title is-4 mb-5 hover-gradient"
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                transition: '0.3s ease',
              }}
            >
              Oops! Something went wrong
            </h2>

            <div
              className="block content-box"
              style={{
                background: 'rgba(255,245,245,0.8)',
                borderRadius: '12px',
                padding: '1.5rem',
                margin: '1rem 0',
                transition: '0.3s ease',
              }}
            >
              <p className="has-text-grey-dark mb-3 hover-scale">
                {"We couldn't load your todos. Please try:"}
              </p>
              <ul className="is-size-6 has-text-left has-text-grey-dark">
                <li className="mb-2 hover-item">
                  <span className="icon has-text-success">
                    <i className="fas fa-wifi"></i>
                  </span>
                  Check internet connection
                </li>
                <li className="mb-2 hover-item">
                  <span className="icon has-text-info">
                    <i className="fas fa-sync"></i>
                  </span>
                  Refresh page or click retry
                </li>
                <li className="hover-item">
                  <span className="icon has-text-warning">
                    <i className="fas fa-life-ring"></i>
                  </span>
                  Contact support if continues
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <button
                className="button is-medium retry-btn"
                style={{
                  background: 'linear-gradient(45deg, #6c5ce7, #a363d9)',
                  color: 'white',
                  borderRadius: '50px',
                  padding: '0 2rem',
                  transition: 'all 0.3s ease',
                  border: 'none',
                }}
                onClick={handleRetry}
              >
                <span className="icon">
                  <i className="fas fa-redo"></i>
                </span>
                <span>Try Again</span>
              </button>
            </div>

            <div
              className="mt-4 has-text-weight-medium is-size-7 error-details"
              style={{
                color: '#666',
                backgroundColor: 'rgba(100,100,100,0.1)',
                padding: '0.5rem',
                borderRadius: '8px',
                transition: '0.3s ease',
              }}
            >
              <span className="icon has-text-grey">
                <i className="fas fa-bug"></i>
              </span>
              Error details: {errorMessage}
            </div>
          </div>
        </div>

        <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hover-item:hover {
          transform: translateX(10px);
          opacity: 0.9;
        }

        .hover-scale:hover {
          transform: scale(1.02);
        }

        .hover-gradient:hover {
          background: linear-gradient(45deg, #ff4757, #ff6b6b);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .retry-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(108,92,231,0.4);
        }

        .content-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .error-details:hover {
          background-color: rgba(100,100,100,0.15);
        }

        .hover-item,
        .hover-scale,
        .content-box,
        .retry-btn,
        .error-details {
          transition: all 0.3s ease;
          cursor: pointer;
        }
      `}</style>
      </div>
    );
  }

  function getPreparedTodos(todosList: Todo[], value: string) {
    return todosList
      .filter(todo => {
        return todo.title.toLowerCase().includes(value.toLowerCase());
      })
      .filter(todo => {
        switch (filterStatus) {
          case 'all':
            return todo.completed || !todo.completed;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
        }
      });
  }

  const filterTodos = getPreparedTodos(todos, searchValue);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                onSearch={setSearchValue}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filterTodos}
                  onOpenModal={handleOpenModal}
                  isModalShow={isModalShow}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShow && selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
