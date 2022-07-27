/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    async function getTodosFromServer() {
      const res = await getTodos();

      setTodos(res);
      setIsloading(true);
    }

    try {
      getTodosFromServer();
    } catch (error) {
      throw new Error('Failed to load todos from server');
    }
  }, []);

  const close = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const selectTodo = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const visibleTodos = todos.filter(item => {
    switch (selectedFilter) {
      case 'active':
        return !item.completed;

      case 'completed':
        return item.completed;

      default:
        return true;
    }
  }).filter(i => i.title.includes(appliedQuery));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectFilter={setSelectedFilter}
                selectSearch={setAppliedQuery}
              />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={close}
        />
      )}
    </>
  );
};

export default App;
