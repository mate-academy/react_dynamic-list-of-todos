/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FilterStatus } from './types/FilterStatus';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL); // Енам і світч кейс
  const [responseFilter, setResponseFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then((response) => {
        setTodos(response);
        setLoading(false);
      });
  }, []);

  // const filteredTodos = todos.filter(todoItem => { //тут якраз світч кейс
  //   if (filter === 'completed') {
  //     return todoItem.completed;
  //   }

  //   if (filter === 'active') {
  //     return !todoItem.completed;
  //   }

  //   return true;
  // });
  const stringIncludes = (full: string, part: string) => (
    full.toLowerCase().includes(part.toLowerCase())
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterStatus.COMPLETED:
        return (
          todos
            .filter(todo => todo.completed)
            .filter(todo => stringIncludes(todo.title, responseFilter))
        );
      case FilterStatus.ACTIVE:
        return (
          todos
            .filter(todo => !todo.completed)
            .filter(todo => stringIncludes(todo.title, responseFilter))
        );
      case FilterStatus.ALL:
      default:
        return (
          todos
            .filter(todo => stringIncludes(todo.title, responseFilter))
        );
    }
  }, [todos, filter, responseFilter]);

  // const visibleTodos = filteredTodos.filter(todoItem => { // два раза фільтрую але ніхуя не шарю шо хоче від мене
  //   return todoItem.title.toLowerCase().includes(responseFilter.toLowerCase());
  // });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={filter}
                response={responseFilter}
                setValue={setFilter}
                setResponse={setResponseFilter}
              />
            </div>

            <div className="block">
              {
                loading ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={todoId}
                    selectTodo={(todo) => setTodoId(todo)}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
      {todoId && (
        <TodoModal
          userId={todoId}
          selectedTodoId={todos}
          selectedTodo={(todo) => setTodoId(todo)}
        />
      )}
    </>
  );
};
