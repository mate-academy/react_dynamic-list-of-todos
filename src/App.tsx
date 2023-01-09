import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectParametr, setSelectParametr] = useState(SortType.all);
  const [copyTodos, setCopyTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    setLoading(true);

    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
      setLoading(false);
      setCopyTodos(loadedTodos);
    } catch (error) {
      throw new Error('error');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const deleteSelectedTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    const filteredTodos = copyTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
      .filter(todo => {
        switch (selectParametr) {
          case SortType.active:
            return !todo.completed;

          case SortType.completed:
            return todo.completed;

          default:
            return todo;
        }
      });

    setTodos(filteredTodos);
  }, [selectParametr, query, copyTodos]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectParametr(value as SortType);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const cleanSearch = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelect={handleSelect}
                selectParametr={selectParametr}
                query={query}
                handleSearch={handleSearch}
                cleanSearch={cleanSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {(!loading || todos.length !== 0) && (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  selectTodo={selectTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            deleteSelectedTodo={deleteSelectedTodo}
          />
        )}
    </>
  );
};
