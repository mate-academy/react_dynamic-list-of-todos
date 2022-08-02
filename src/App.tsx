/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
      setVisibleTodos(todosFromServer);
    };

    loadTodos();
  }, []);

  const todosFilter = (inputType: string, typeSelect: string) => {
    let visibledTodos = [...todos]
      .filter(({ title }) => title.toLowerCase().includes(inputType));

    const filteringVisibleTodos = (condition: boolean) => {
      visibledTodos = todos
        .filter(({ completed, title }) => completed === condition && title.toLowerCase().includes(inputType));
    };

    if (typeSelect === 'active') {
      filteringVisibleTodos(false);
    }

    if (typeSelect === 'completed') {
      filteringVisibleTodos(true);
    }

    setVisibleTodos(visibledTodos);
  };

  const selectTodoId = (todoId: number) => setSelectedTodoId(todoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getInput={todosFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onTodoSelected={selectTodoId}
                    selectedTodo={selectedTodoId}
                  />
                ) }
            </div>

            {selectedTodoId > 0 && (
              <TodoModal
                todo={visibleTodos.find(todo => todo.id === selectedTodoId)}
                onTodoSelected={selectTodoId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
