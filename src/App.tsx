/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { QueryType } from './types/QueryType';

type State = {
  isLoading: boolean,
  isTodoModel: boolean,
  todos: Todo[],
  visiableTodos: Todo[],
  query: string,
  queryType: QueryType,
  todoModel: Todo | null,
};

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    isLoading: true,
    isTodoModel: false,
    todos: [],
    visiableTodos: [],
    query: '',
    queryType: 'all',
    todoModel: null,
  });

  const getTodosFromApi = async () => {
    const reseivedTodos = await getTodos();

    if (reseivedTodos) {
      setState(prevState => {
        return {
          ...prevState,
          isLoading: false,
          todos: reseivedTodos,
          visiableTodos: reseivedTodos,
        };
      });
    }
  };

  useEffect(() => {
    getTodosFromApi();
  }, []);

  const setVisiableTodos = () => {
    setState(prevState => {
      const { todos, query, queryType } = prevState;
      let filteredTodos = todos;

      const checkTitle = (title: string) => {
        return title.toLowerCase().includes(query.toLowerCase());
      };

      if (queryType === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed && checkTitle(todo.title));
      }

      if (queryType === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed && checkTitle(todo.title));
      }

      if (queryType === 'all') {
        filteredTodos = todos.filter(todo => checkTitle(todo.title));
      }

      return {
        ...prevState,
        visiableTodos: filteredTodos,
      };
    });
  };

  useEffect(() => {
    setVisiableTodos();
  }, [state.query, state.queryType]);

  const handelQuery = (value: string) => {
    setState(prevState => {
      return {
        ...prevState,
        query: value,
      };
    });
  };

  const handelQueryType = (value: QueryType) => {
    setState(prevState => {
      return {
        ...prevState,
        queryType: value,
      };
    });
  };

  const setTodoModel = (id: number) => {
    const todoModel = state.visiableTodos
      .find(todo => todo.id === id) || null;

    setState(prevState => {
      return {
        ...prevState,
        todoModel,
      };
    });
  };

  const handelCloseTodoModel = () => {
    setState(prevState => {
      return {
        ...prevState,
        todoModel: null,
      };
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={state.query}
                setQuery={(value: string) => handelQuery(value)}
                queryType={state.queryType}
                selectQueryType={(value: QueryType) => handelQueryType(value)}
              />
            </div>

            <div className="block">
              {state.isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={state.visiableTodos}
                    todoModel={state.todoModel}
                    handelEyeBtn={(id: number) => setTodoModel(id)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {state.todoModel !== null && (
        <TodoModal
          todo={state.todoModel}
          closeTodoModel={handelCloseTodoModel}
        />
      )}
    </>
  );
};
