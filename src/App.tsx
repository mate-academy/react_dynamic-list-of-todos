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
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [clicked, setClicked] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [status, setStatus] = useState('all');
  const [words, setWords] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesWords = todo.title.toLowerCase().includes(words.toLowerCase());

    return matchesStatus && matchesWords;
  });

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setClicked(true);
    setSelectedTodoId(todo.id);

    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                words={words}
                setWords={setWords}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodoId={selectedTodoId}
                  todos={filteredTodos}
                  onTodoClick={handleTodoClick}
                  fullTodos={todos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          clicked={clicked}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
