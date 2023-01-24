/* eslint-disable max-len */
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import { findVisibleTodos } from './tools/findVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoID, setSelectedTodoID] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const selectTodo = useCallback((todoId: number) => {
    setSelectedTodoID(todoId);
  }, []);

  const changeSearchQuery = useCallback((searchValue: string) => {
    setSearchQuery(searchValue);
  }, []);

  const deleteSearchQuery = useCallback(() => setSearchQuery(''), []);

  const changeTodoStatus = useCallback((changeValue: string) => {
    setTodoStatus(changeValue);
  }, []);

  const closeModal = useCallback(() => setSelectedTodoID(0), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoID)
  ), [selectedTodoID]);

  const visibleTodos = findVisibleTodos(todos, searchQuery, todoStatus);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={changeSearchQuery}
                onStatus={changeTodoStatus}
                onDeleteQuery={deleteSearchQuery}
                searchQuery={searchQuery}
                todoStatus={todoStatus}
              />
            </div>

            <div className="block">
              {
                todos.length ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoID={selectedTodoID}
                    onSelectTodoId={selectTodo}
                  />
                ) : (
                  <Loader />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            onCloseModal={closeModal}
          />
        )
      }
    </>
  );
};
