/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
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
  const [todoModal, setTodoModal] = useState<Todo | null>(null);
  const [selectCompleted, setSelectCompleted] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadGoods = async () => {
      const goodsData = await getTodos();

      setTodos(goodsData);
    };

    loadGoods();
  }, [todos]);

  const openModal = useCallback((todo: Todo) => {
    setTodoModal(todo);
  }, []);

  const resetTodoModal = useCallback((reset: null) => {
    setTodoModal(reset);
  }, []);

  const handleSelect = useCallback((e: string) => {
    setSelectCompleted(e);
  }, []);

  const searchQuery = useCallback((word: string) => {
    setQuery(word);
  }, []);

  const filteredTodos = useMemo(() => {
    let newTodos = todos;

    switch (selectCompleted) {
      case 'active': newTodos = newTodos.filter(todo => !todo.completed);
        break;

      case 'completed': newTodos = newTodos.filter(todo => Boolean(todo.completed));
        break;

      case 'all': newTodos = todos;
        break;
      default: throw new Error('Wrong selection!');
    }

    const queryTrimed = query.trim().toLowerCase();

    if (query) {
      newTodos = newTodos.filter(todo => {
        const { title } = todo;

        return title.toLowerCase().includes(queryTrimed);
      });
    }

    return newTodos;
  }, [todos, selectCompleted, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelect={handleSelect}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={filteredTodos}
                openModal={openModal}
                onReset={todoModal}
              />
            </div>
          </div>
        </div>
      </div>
      {todoModal !== null && <TodoModal todoModal={todoModal} resetTodoModal={resetTodoModal} />}
    </>
  );
};
