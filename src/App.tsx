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
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filterMode, setFilterMode] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  const applyFilterAndSearch = (mode: string, searchText: string) => {
    setFilterMode(mode);

    let filtered = todos;

    if (mode === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    } else if (mode === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    const finalFiltered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    setCurrentTodos(finalFiltered);
  };

  // #region filter todos
  const filterBy = (mode: string) => {
    applyFilterAndSearch(mode, searchInput);
  };
  // #endregion

  // #region find todos
  const findBy = (inputText: string) => {
    setSearchInput(inputText);
    applyFilterAndSearch(filterMode, inputText);
  };
  // #endregion

  // #region get todos
  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((todosFromServer: Todo[]) => {
        setTodos(todosFromServer);
        setCurrentTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);
  // #endregion

  // #region find user
  const findUser = (todo: Todo) => {
    setCurrentTodo(todo);
    setSelectedTodoId(todo.id);
  };
  // #endregion

  const closeTodoInfo = () => {
    setCurrentTodo(null);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filtering={filterBy} finding={findBy} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={currentTodos}
                  todosUser={findUser}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} close={closeTodoInfo} />
      )}
    </>
  );
};
