/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const loadingTodo = await getTodos();

        setTodos(loadingTodo);
        setLoading(false);
        setVisibleTodos(loadingTodo);
      } catch (error) {
        setLoading(false);
      }
    };

    loadTodo();
  }, []);

  const handleFilterBy = (filterType: string) => {
    setFilterBy(filterType);
  };

  const handleFilter = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  const handleChangeQuery = (input: string) => {
    setQuery(input);
  };

  useEffect(() => {
    switch (filterBy) {
      case Filter.ALL:
        setVisibleTodos(todos.filter(todo => handleFilter(todo.title)));
        break;

      case Filter.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed && handleFilter(todo.title)));
        break;

      case Filter.COMPLETED:
        setVisibleTodos(todos.filter(todo => todo.completed && handleFilter(todo.title)));
        break;

      default:
        break;
    }
  }, [filterBy, query]);

  const selectUser = (id: number, todoId: number) => {
    setUserId(id);
    setSelectedTodo(todoId);
  };

  const selectUsersTodo = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                chooseFilteredType={handleFilterBy}
                changeQuery={handleChangeQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectUser={selectUser}
              />
            </div>
          </div>
        </div>
      </div>

      {!!userId && (
        <TodoModal
          todo={selectUsersTodo}
          selectUser={selectUser}
        />
      )}
    </>
  );
};
