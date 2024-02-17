/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((todo) => {
        setTodos(todo);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = (option: string, titl: string): Todo[] => {
    let filteredTodos = todos;

    switch (option) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todos;
        break;
    }

    if (titl.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(titl.toLowerCase()));
    }

    return filteredTodos;
  };

  const vissibleTodos = useMemo(() => {
    return filterTodos(selectedOption, title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, title, todos]);

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
                setTitle={setTitle}
                title={title}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={vissibleTodos}
                  setCurrentTodo={setCurrentTodo}
                  currentTodo={currentTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          setCurrentTodo={setCurrentTodo}
        />
      )}

    </>
  );
};
