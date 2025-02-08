/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { CompletedType, Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoLoader, setTodoLoader] = useState(true);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CompletedType>('all');
  const [selctedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(result => {
        setOriginalTodos(result);
        setTodos(result);
      })
      .catch(e => {
        console.error('Todos Loading error: ', e);
      })
      .finally(() => setTodoLoader(false));
  }, []);

  const filterTodos = useCallback(
    (posts: Todo[], filterBy: string, queryParam: string) => {
      let filtered = posts;

      if (filterBy === 'completed') {
        filtered = filtered.filter(todo => todo.completed === true);
      } else if (filterBy === 'active') {
        filtered = filtered.filter(todo => todo.completed === false);
      }

      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(queryParam.toLowerCase()),
      );

      return filtered;
    },
    [],
  );

  const applyQuery = useCallback(
    debounce((value: string) => {
      setTodoLoader(false);
      setAppliedQuery(value);
    }, 500),
    [],
  );

  const handleInputFilter = (value: string) => {
    applyQuery(value);
    setQuery(value);
  };

  const handleFilter = (filterBy: CompletedType) => {
    setFilter(filterBy);
  };

  const resetInputQuery = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const openPost = (todo?: Todo | null) => {
    if (todo) {
      setSelectedTodo(todo);
    } else {
      setSelectedTodo(null);
    }
  };

  useEffect(() => {
    const filteredTodos = filterTodos(originalTodos, filter, appliedQuery);

    setTodos(filteredTodos);
  }, [filter, appliedQuery, filterTodos, originalTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={handleFilter}
                inputFilter={handleInputFilter}
                inputValue={query}
                reset={resetInputQuery}
              />
            </div>

            <div className="block">
              {todoLoader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  openPost={openPost}
                  selectedTodo={selctedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selctedTodo && <TodoModal post={selctedTodo} closeModal={openPost} />}
    </>
  );
};
