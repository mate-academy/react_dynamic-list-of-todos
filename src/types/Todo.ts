// Interface que define a estrutura de um Todo vindo da API.
// Cada todo pertence a um usuário (userId) e pode estar
// completado (completed: true) ou pendente (completed: false).
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
