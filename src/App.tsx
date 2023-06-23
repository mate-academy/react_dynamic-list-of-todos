/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [qwery, setQwery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [checkLoad, setCheckLoad] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const filterTodos = () => {
    let newTodos = [...todos];

    const qweryNormal = qwery.toLowerCase().trim();

    if (qweryNormal) {
      newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(qweryNormal));
    }

    switch (selectedFilter) {
      case 'active':
        return newTodos.filter(todo => !todo.completed);

      case 'completed':
        return newTodos.filter(todo => todo.completed);

      default: return newTodos;
    }
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleDataModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const visibleTodos = filterTodos();

  const getTodo = async () => {
    try {
      const arrTodo = await getTodos();

      setCheckLoad(false);

      setTodos(arrTodo);
    } catch {
      setCheckLoad(true);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQwery={setQwery}
                qwery={qwery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {
                checkLoad
                  ? <Loader />
                  : (
                    <TodoList
                      selectedTodo={selectedTodo}
                      todos={visibleTodos}
                      setOpenModal={setOpenModal}
                      handleDataModal={handleDataModal}
                    />
                  )
              }

            </div>
          </div>
        </div>
      </div>

      {
        openModal && (
          <TodoModal
            clearTodo={clearSelectedTodo}
            selectedTodo={selectedTodo}
            setOpenModal={setOpenModal}
          />
        )

      }
    </>
  );
};
