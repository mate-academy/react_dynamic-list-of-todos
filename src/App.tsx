/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { SelectedTodosType } from './types/SelectedTodosType';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visiableTodos, setVisiableTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTods, setSelectedTodos] = useState<SelectedTodosType>(SelectedTodosType.All);
  const [todoModel, setTodoModel] = useState<Todo | null>(null);

  const getTodosFromApi = useCallback(
    async () => {
      setIsLoading(true);

      await getTodos()
        .then(res => {
          setTodos(res);
          setVisiableTodos(res);
        })
        .catch(() => setIsLoading(false))
        .then(() => setIsLoading(false));
    },
    [],
  );

  useEffect(() => {
    getTodosFromApi();
  }, []);

  const handelVisiableTodos = useCallback(
    () => {
      const checkTitle = (title: string) => {
        return title.toLowerCase().includes(query.toLowerCase());
      };

      setVisiableTodos(todos.filter(todo => {
        if (selectedTods === SelectedTodosType.Completed) {
          return todo.completed && checkTitle(todo.title);
        }

        if (selectedTods === SelectedTodosType.Active) {
          return !todo.completed && checkTitle(todo.title);
        }

        return checkTitle(todo.title);
      }));
    },
    [query, selectedTods],
  );

  useEffect(() => {
    handelVisiableTodos();
  }, [query, selectedTods]);

  const handelSetTodoModel = (id: number) => {
    const newModel = visiableTodos.find(todo => todo.id === id) || null;

    setTodoModel(newModel);
  };

  const handelCloseTodoModel = () => {
    setTodoModel(null);
  };

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
                selectedTodosType={selectedTods}
                handelSelectedTodosType={setSelectedTodos}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visiableTodos}
                    todoModel={todoModel}
                    handelEyeBtn={handelSetTodoModel}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoModel !== null && (
        <TodoModal
          todo={todoModel}
          closeTodoModel={handelCloseTodoModel}
        />
      )}
    </>
  );
};
