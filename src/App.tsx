import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { TodoFilterValues } from './types/filterEnum';

export const App: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [choosedUserId, setChoosedUserId] = useState<number | null>(null);
  const [choosedTodo, setChoosedTodo] = useState<Todo | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [
    todoFilter,
    setTodoFilter,
  ] = useState<TodoFilterValues>(TodoFilterValues.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((data) => {
        setTodos(data);
        setVisibleTodos(todos);
      })
      .finally(() => setLoading(false));
  }, []);

  const chooseUserId = (id: number) => {
    setChoosedUserId(id);
  };

  const clearUserId = () => {
    setChoosedUserId(null);
  };

  const chooseTodo = (todo: Todo) => {
    setChoosedTodo(todo);
  };

  const clearChoosedTodo = () => {
    setChoosedTodo(null);
  };

  const selectTodoFilter = (value: string) => {
    setTodoFilter(value as TodoFilterValues);
  };

  const filterTodos = (value: TodoFilterValues = todoFilter) => {
    if (value === TodoFilterValues.all || !todos) {
      return todos;
    }

    const filteredTodos = todos.filter(({ completed }) => {
      switch (value) {
        case TodoFilterValues.active:
          return !completed;
          break;

        case TodoFilterValues.completed:
          return completed;
          break;

        default:
          return true;
          break;
      }
    });

    return filteredTodos;
  };

  useEffect(() => {
    setVisibleTodos(filterTodos()
      .filter((todo) => todo.title.toLowerCase().includes(query)));
  }, [todoFilter, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoFilter={todoFilter}
                selectTodoFilter={selectTodoFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    visibleTodos={visibleTodos}
                    chooseUserId={chooseUserId}
                    chooseTodo={chooseTodo}
                    choosedTodoId={choosedTodo?.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {choosedUserId
      && (
        <TodoModal
          userId={choosedUserId}
          clearUserId={clearUserId}
          choosedTodo={choosedTodo}
          clearChoosedTodo={clearChoosedTodo}
        />
      )}
    </>
  );
};
