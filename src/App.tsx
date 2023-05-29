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
  const [selectCompleted, setSelectCompleted] = useState('');
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
    let newTodo = todos;

    switch (selectCompleted) {
      case 'active': newTodo = newTodo.filter(todo => !todo.completed);
        break;

      case 'completed': newTodo = newTodo.filter(todo => Boolean(todo.completed));
        break;
      default: throw new Error('Wrong selection!');
    }

    const queryTrimed = query.trim().toLowerCase();

    if (query) {
      newTodo = newTodo.filter(todo => todo.title.toLowerCase().includes(queryTrimed));
    }

    return newTodo;
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
