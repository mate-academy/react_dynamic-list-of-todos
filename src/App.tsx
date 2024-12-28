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

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todos => {
      setAllTodos(todos);
      setLoading(false);
      setVisibleTodos(todos);
    });
  }, []);

  useEffect(() => {
    let newTodos = [...allTodos];

    if (filter) {
      newTodos = newTodos.filter(todo => {
        switch (filter) {
          case Filter.Completed:
            return todo.completed;
          case Filter.Active:
            return !todo.completed;
          default:
            return true;
        }
      });
    }

    if (query) {
      newTodos = newTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(newTodos);
  }, [filter, query, allTodos]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

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
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
