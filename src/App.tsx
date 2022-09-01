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
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectStatus, setSelectStatus] = useState('all');
  const [query, setQuery] = useState('');

  const filteredTodos = todos.filter(todo => {
    const inputTitle = todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    switch (selectStatus) {
      case 'active':
        return inputTitle && todo.completed === false;
      case 'completed':
        return inputTitle && todo.completed === true;
      default:
        return inputTitle;
    }
  });

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    getTodos().then(todoAll => setTodos(todoAll));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                statusSelect={(status) => {
                  setSelectStatus(status);
                }}
                inputQuery={(inputValue) => {
                  setQuery(inputValue);
                }}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectTodoId={todoId => {
                      setSelectedTodoId(todoId);
                    }}
                    selectedTodoId={selectedTodoId}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
