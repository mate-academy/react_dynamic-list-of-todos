// Módulo de API — centraliza todas as chamadas HTTP para o servidor.
// Usa fetch nativo para buscar dados e inclui um delay artificial
// para que o Loader seja visível durante o carregamento.

import { Todo } from './types/Todo';
import { User } from './types/User';

// URL base da API — todos os endpoints são relativos a esta URL
// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// Função utilitária que retorna uma Promise resolvida após um delay.
// É usada para simular uma latência de rede, garantindo que o
// componente Loader tenha tempo de aparecer na tela.
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// Função genérica para fazer requisições GET.
// O tipo genérico <T> permite tipar a resposta da API automaticamente,
// evitando casts manuais em cada chamada.
function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // Primeiro espera 300ms (delay artificial), depois faz o fetch
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

// Busca TODOS os todos da API — retorna um array tipado de Todo[]
export const getTodos = () => get<Todo[]>('/todos');

// Busca os dados de um usuário específico pelo ID — retorna um objeto User
export const getUser = (userId: number) => get<User>(`/users/${userId}`);
