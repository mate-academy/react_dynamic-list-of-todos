/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [complitedFilter, setComplitedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const filterList = useCallback(
    (list: Todo[]) => {
      let todoList = list.filter(todoItem => todoItem.title.includes(searchQuery));

      switch (complitedFilter) {
        case 'all': break;
        case 'completed': todoList = todoList.filter(todoItem => todoItem.completed); break;
        case 'active': todoList = todoList.filter(todoItem => !todoItem.completed); break;
        default: break;
      }

      return todoList;
    }, [complitedFilter, searchQuery],
  );

  const visiableTodos = useMemo(() => (
    filterList(todos)
  ), [todos, complitedFilter, searchQuery]);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId) || null
  ), [selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                complitedFilter={complitedFilter}
                setComplitedFilter={setComplitedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visiableTodos}
                selectedTodoId={selectedTodoId}
                onSelectedTodoId={setSelectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={setSelectedTodoId} />}
    </>
  );
};
