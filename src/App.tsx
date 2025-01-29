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
// import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setIsModalVisible(false);
  };

  const filteredTodos = todos.filter(todo => {
    // active-не завершені

    if (filter === 'active' && todo.completed) {
      return false;
    }

    // completed-завершені
    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    // фільтрація за назваою
    return todo.title.toLowerCase().includes(query.toLowerCase());

    // return true; //all
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onChangeFilter={setFilter}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
