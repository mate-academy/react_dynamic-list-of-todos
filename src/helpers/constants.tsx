export enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const initValues = {
  initTodos: [],
  initSelectedTodoId: 0,
  initFilter: Filter.all,
  initSearch: '',
};
