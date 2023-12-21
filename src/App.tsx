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

function todosToRender(tasks: Todo[], wanted: string, selected: Filter) {
  let result = tasks;

  switch (selected) {
    case 'active':
      result = tasks.filter(task => !task.completed);
      break;
    case 'completed':
      result = tasks.filter(task => task.completed);
      break;
    default:
      break;
  }

  result = result.filter(task => task.title.toLowerCase().includes(wanted.toLowerCase()));

  return result;
}

export const App: React.FC = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const todosToShow = todosToRender(todos, query, selectedFilter);

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
              {isLoadingTodos
                && <Loader />}
              <TodoList
                todos={todosToShow}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && isModalOpen
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setIsModalOpen={setIsModalOpen}
            setSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
