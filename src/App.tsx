/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

// Componente principal da aplicação — gerencia todo o estado global
// e orquestra a comunicação entre os componentes filhos via props.
export const App: React.FC = () => {
  // Lista completa de todos carregados da API (nunca é filtrada diretamente)
  const [todos, setTodos] = useState<Todo[]>([]);

  // Controla a exibição do Loader enquanto os todos estão sendo carregados
  const [loading, setLoading] = useState(false);

  // Texto digitado no campo de busca — usado para filtrar por título
  const [query, setQuery] = useState('');

  // Filtro de status selecionado no <select>: 'all' | 'active' | 'completed'
  const [filterStatus, setFilterStatus] = useState('all');

  // Todo selecionado para exibir no modal (null = modal fechado)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // useEffect com array vazio [] executa apenas uma vez, no mount do componente.
  // Faz a chamada à API para buscar todos os todos e armazena no estado.
  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  // useMemo recalcula a lista visível SOMENTE quando 'todos', 'query' ou
  // 'filterStatus' mudam, evitando re-filtragens desnecessárias a cada render.
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      // Filtro por texto: compara título em lowercase com query em lowercase
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      // Filtro por status: 'all' mostra tudo, 'active' apenas não completados,
      // 'completed' apenas os completados
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && !todo.completed) ||
        (filterStatus === 'completed' && todo.completed);

      // O todo só aparece se passa nos DOIS filtros simultaneamente
      return matchesQuery && matchesStatus;
    });
  }, [todos, query, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {/* Componente de filtros: select de status + campo de busca */}
              <TodoFilter
                query={query}
                filterStatus={filterStatus}
                onQueryChange={setQuery}
                onFilterStatusChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {/* Loader aparece enquanto os dados estão sendo carregados */}
              {loading && <Loader />}

              {/* TodoList só é renderizado quando o loading termina */}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id || 0}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TodoModal só aparece quando há um todo selecionado */}
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
