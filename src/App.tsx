/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectStatus, setSelectStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState<string>('');
  
  const primeiraRenderizacaoSelect = useRef(true);
  const primeiraRenderizacaoQuery = useRef(true);

  type TypeFilter = 'filter' | 'without'

  const getTodosProxy = async (filter: TypeFilter = 'without') => {
    try {
      setLoading(true);
      const todos = filter === 'without' ? await getTodos() : await getTodos()
                                                                      .then((todosNotFiltered: Todo[]) => {
                                                                       return todosNotFiltered.filter(todo => {
                                                                          switch (selectStatus) {
                                                                            case 'active':
                                                                              return !todo.completed;
                                                                            case 'completed':
                                                                              return todo.completed;
                                                                            case 'all':
                                                                              return true;
                                                                          }
                                                                        });
                                                                      });
      if(!todos) {
        throw new Error();
      }
      return todos;
    }

    finally {
      setLoading(false);
    }  
  }
  
  useEffect(() => {
    const fecthTodos = async () => {
      const todosFetched = await getTodosProxy();

      setTodos(todosFetched);
    };

    fecthTodos();
  }, []);

  const filterTodosBySelectStatus = async () => {
    const todosFilteredBySelectStatus = await getTodosProxy('filter');

    return todosFilteredBySelectStatus;
  };

  useEffect(() => {

    if(primeiraRenderizacaoSelect.current) {
      primeiraRenderizacaoSelect.current = false;
      return;
    }

    filterTodosBySelectStatus().then((todosFilteredBySelectStatus: Todo[]) => {
      if(query !== '') {
        setTodos(
          todosFilteredBySelectStatus.filter((todoFiltered: Todo) => {
            const {title} = todoFiltered;
            return title.toLowerCase().includes(query);
          })
        )
        return;
      }

      setTodos(todosFilteredBySelectStatus);
    });
  }, [selectStatus]);

  useEffect(() => {
    if(primeiraRenderizacaoQuery.current) {
      primeiraRenderizacaoQuery.current = false;
      return;
    }

    const filterTodosByQuery = async () => {
      const todosByStatus = await filterTodosBySelectStatus();
      const todosFilteredByQuery = todosByStatus.filter((todo: Todo) => {
        const { title } = todo;
        const titleLowerCase = title.toLowerCase();
        const queryLowerCase = query.toLowerCase();

        return titleLowerCase.includes(queryLowerCase);
      });

      setTodos(todosFilteredByQuery);
    };

    filterTodosByQuery();
  }, [query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={selectStatus}
                setSelectStatus={setSelectStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </>
  );
};
