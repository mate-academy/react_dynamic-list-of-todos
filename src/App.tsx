import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo, SelectedStatus } from './types/Todo';
import { getTodos } from './api';

function isIncludesQuery(todoTitle: string, query: string) {
  return todoTitle.toLowerCase().includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoStatus, setSelectedTodoStatus]
    = useState<string>(SelectedStatus.All);

  const handleSelectTodo = (todoId: number | null) => (
    todoId
      ? (setSelectedTodo(todos.find(todo => todo.id === todoId) || null))
      : setSelectedTodo(null)
  );

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTodoStatus(event.target.value);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const todosFromServer = async () => {
    const data = await getTodos();

    setInitialTodos(data);
  };

  useEffect(() => {
    todosFromServer();
  }, []);

  const getFiltredTodos = () => {
    return initialTodos.filter(todo => {
      switch (selectedTodoStatus) {
        case SelectedStatus.All:
          return isIncludesQuery(todo.title, query);

        case SelectedStatus.Active:
          return !todo.completed && isIncludesQuery(todo.title, query);
          break;

        case SelectedStatus.Completed:
          return todo.completed && isIncludesQuery(todo.title, query);
          break;

        default:
          return todo.title;
      }
    });
  };

  useEffect(() => {
    setTodos(getFiltredTodos);
  }, [initialTodos, query, selectedTodoStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={selectedTodoStatus}
                query={query}
                onSelectStatus={handleSelectStatus}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!todos.length && !query ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onSelectTodo={handleSelectTodo}
                  selectedId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleSelectTodo}
        />
      )}
    </>
  );
};
