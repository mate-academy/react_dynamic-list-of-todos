/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser, wait } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const checkoutQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const openModal = async (todo: Todo) => {
    setIsModalLoading(true); // Ativa o carregamento no modal
    setLoading(true);
    setSelectedTodo(todo); // Define o todo selecionado
    setIsModalOpen(true); // Abre o modal

    // Aguarda 3 segundos (simula o carregamento)
    await wait(1000);

    setLoading(false); // Após o tempo de espera, desativa o carregamento
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const resetInput = () => {
    setQuery('');
  };

  useEffect(() => {
    getTodos()
      .then(async todosData => {
        // Aqui, para cada Todo, buscamos o usuário correspondente
        const todosWithUsers = await Promise.all(
          todosData.map(async todo => {
            const user = await getUser(todo.userId); // Fazendo a requisição para pegar o usuário

            return {
              ...todo,
              user, // Associando o usuário ao todo
            };
          }),
        );

        setTodos(todosWithUsers); // Atualizando o estado com todos os dados completos
      })
      .finally(() => setLoading(false)); // Garantir que o loading seja removido
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !todo.completed) ||
      (statusFilter === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={checkoutQuery}
                resetInput={resetInput}
                statusFilter={statusFilter}
                onStatusChange={e => setStatusFilter(e.target.value)}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} openModal={openModal} />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalLoading && selectedTodo && (
        <TodoModal todo={selectedTodo} loader={loading} onClose={closeModal} />
      )}
    </>
  );
};
