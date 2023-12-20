/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const EMPTY_TODO = {
  id: 0,
  title: 'testtesttest',
  completed: true,
  userId: 0,
};

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo>(EMPTY_TODO);
  const [selectedModel, setSelectedModel] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  function TodosToRender(tasks: Todo[], wanted: string, selected: Filter) {
    let result;

    switch (selected) {
      case 'active':
        result = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        result = tasks.filter(task => task.completed);
        break;
      default:
        result = tasks;
        break;
    }

    result = result.filter(task => task.title.toLowerCase().includes(wanted.toLowerCase()));

    return result;
  }

  useEffect(() => {
    setVisibleTodos(TodosToRender(todos, query, selectedFilter));
  }, [query, selectedFilter, todos]);

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
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {loadingTodos
                && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedModel
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedModel={setSelectedModel}
          />
        )}
    </>
  );
};
