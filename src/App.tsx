/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
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

  useEffect(() => {
    const fecthTodos = async () => {
      const todos = await getTodos();

      setTodos(todos);
      setLoading(false);
    };

    setLoading(true);

    fecthTodos();
  }, []);

  const filterTodosBySelectStatus = async () => {      
    const todosFilteredBySelectStatus = await getTodos()
                                      .then((todos: Todo[]) => {
                                        return todos.filter((todo) => {
                                          switch(selectStatus) {
                                            case 'active':
                                              return !todo.completed;
                                            case 'completed':
                                              return todo.completed;
                                            case 'all':
                                              return todo;
                                          }
                                        })
                                      });
    return todosFilteredBySelectStatus;
  }

  useEffect(() => {

    const todosFilteredBySelectStatus = filterTodosBySelectStatus()
                                          .then((todosFilteredBySelectStatus: Todo[]) => {
                                            setTodos(todosFilteredBySelectStatus);
                                          })
   

  }, [selectStatus]);

  useEffect(() => {
    const filterTodosByQuery = async () => {
      const todosByStatus = await filterTodosBySelectStatus();
      const todosFilteredByQuery = todosByStatus.filter((todo: Todo) => {

        const {title} = todo;
        const titleLowerCase = title.toLowerCase();
        const queryLowerCase = query.toLowerCase();

        return titleLowerCase.includes(queryLowerCase);
      })

      setTodos(todosFilteredByQuery);
    }

    filterTodosByQuery();
  }, [query, selectStatus])

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter selectStatus={selectStatus} setSelectStatus={setSelectStatus} setQuery={setQuery} query={query} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && <TodoList todos={todos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo}/>}
            </div>
          </div>
        </div>
      </div>

      <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
    </>
  );
};
