/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import './styles.scss';
import { SelectFilter } from './types/SelectFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [complitedFilter, setComplitedFilter] = useState(SelectFilter.ALL);

  const filterTodos = useCallback((todoList: Todo[], queryInput: string) => {
    if (!todoList.length) {
      return null;
    }

    return todoList.filter(todo => {
      const includedTitle = todo.title.toLowerCase()
        .includes(queryInput.toLowerCase().trim());

      switch (complitedFilter) {
        case SelectFilter.ALL:
          return includedTitle;
        case SelectFilter.COMPLETED:
          return !todo.completed && includedTitle;
        case SelectFilter.ACTIVE:
          return todo.completed && includedTitle;
        default:
          return todo;
      }
    });
  }, [complitedFilter]);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId) || null
  ), [todos, selectedTodoId]);

  const filteredTodos = useMemo(() => (
    filterTodos(todos, searchQuery)
  ), [todos, searchQuery, complitedFilter]);

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={complitedFilter}
                inputQuery={searchQuery}
                setOnFilter={setComplitedFilter}
                onInputQuery={setSearchQuery}
              />
            </div>

            {todos.length === 0 && <Loader />}
            {filteredTodos && (
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodoId}
                onSelectedTodoId={setSelectedTodoId}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
