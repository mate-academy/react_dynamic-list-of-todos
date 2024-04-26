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
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTodos(filtered);
  }, [searchTerm, todos]);

  useEffect(() => {
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
    if (filter === 'all') {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter(todo => {
        return filter === 'active' ? !todo.completed : todo.completed;
      }));
    }
  }, [todos, filter]);

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
              <TodoFilter filter={filter} setFilter={setFilter} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} showModal={handleShowTodoModal} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} close={handleCloseTodoModal}/>}
    </>
  );
};

export default App;
