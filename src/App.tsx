/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | ''>('');

  const [todoFilter, setTodoFilter] = useState({
    input: '',
    filter: 'all',
  });

  useEffect(() => {
    setLoader(true);

    getTodos().then(data => {
      setTodos(data);
      setLoader(false);
    });
  }, []);

  const currentTodos = useCallback(() => {
    const { input, filter } = todoFilter;

    if (!input && filter === 'all') {
      return todos;
    }

    return todos.filter(content => {
      if (input && !content.title.toLowerCase().includes(input.toLowerCase())) {
        return false;
      }

      switch (filter) {
        case 'active':
          return !content.completed;
        case 'completed':
          return content.completed;
        default:
          return true;
      }
    });
  }, [todoFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter values={todoFilter} set={setTodoFilter} />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList
                todos={currentTodos()}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
