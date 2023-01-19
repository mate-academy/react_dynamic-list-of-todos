/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [selector, setSelector] = useState('All');

  const closeTodoModal = () => {
    setTodoId(0);
  };

  const handleSetTodo = (id:number) => {
    setTodoId(id);
  };

  const handleSetQuery = (word: string) => {
    setQuery(word);
  };

  const handleSetSelector = (option: string) => {
    setSelector(option);
  };

  const handleDeleteQueryText = () => {
    setQuery('');
  };

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);
  const selectedTodo = todos.find(todo => todoId === todo.id) || 0;

  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  let visibleTodos = filteredTodos;

  if (selector === 'active') {
    visibleTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (selector === 'completed') {
    visibleTodos = filteredTodos.filter(todo => todo.completed);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSearchQueryChange={handleSetQuery}
                selector={selector}
                onSelectorChange={handleSetSelector}
                onDeleteButtonClick={handleDeleteQueryText}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              )
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={handleSetTodo}
                    selectTodoId={todoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== 0 && (
        <TodoModal
          todo={selectedTodo}
          onClickCloseTodoModal={closeTodoModal}
        />
      )}
    </>
  );
};
