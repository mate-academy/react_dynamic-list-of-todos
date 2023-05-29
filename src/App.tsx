/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  let visibleTodos = [...todosFromServer];
  const visibleTodosForModal = visibleTodos.find(todo => todo.id === selectedTodoId)
    || todosFromServer[0];
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');

  useEffect(() => {
    const getTodosFromServer = async () => {
      const todos = await getTodos();

      setTodosFromServer(todos);
    };

    getTodosFromServer();
  }, []);

  const getSelectedTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  switch (selectedOption) {
    case 'active':
      visibleTodos = todosFromServer.filter(todo => !todo.completed);
      break;
    case 'completed':
      visibleTodos = todosFromServer.filter(todo => todo.completed);
      break;
    default:
      visibleTodos = todosFromServer;
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo => {
      const correctQuery = query.toLowerCase().trim();
      const correctTitle = todo.title.toLowerCase().trim();

      return correctTitle.includes(correctQuery);
    });
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
                setQuery={setQuery}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            {todosFromServer.length
              ? (
                <div className="block">
                  <TodoList
                    getSelectedTodoId={getSelectedTodoId}
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                  />
                </div>
              )
              : (
                <Loader />
              )}
          </div>
        </div>
      </div>
      {selectedTodoId !== 0 && (
        <TodoModal
          todo={visibleTodosForModal}
          getSelectedTodoId={getSelectedTodoId}
        />
      )}
    </>
  );
};
