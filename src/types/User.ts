// Interface que define a estrutura de um User vindo da API.
// Representa o dono de um ou mais todos — usado no modal
// para exibir nome e email do responsável pela tarefa.
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
