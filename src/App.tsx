/* eslint-disable prettier/prettier */
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

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        throw new Error('Fetch not completed', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = todos.filter(todo => {
      const searchTermMatch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === 'all') {
        return searchTermMatch;
      } else if (filter === 'active') {
        return searchTermMatch && !todo.completed;
      } else {
        return searchTermMatch && todo.completed;
      }
    });

    setFilteredTodos(filtered);
  }, [todos, filter, searchTerm]);

  const handleShowTodoModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodoModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={(value: string) => setFilter(value as 'all' | "active" | "completed")}setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} showModal={handleShowTodoModal} selectedTodo={selectedTodo} showIcon={selectedTodo?.id}/>
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} close={handleCloseTodoModal}/>}
    </>
  );
};

export default App;
