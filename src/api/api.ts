const API_URL = 'https://mate.academy/students-api';

export const request = (url: string) => fetch(`${API_URL}${url}`).then((res) => res.json());
export const getTodos = (params = ''): Promise<Todo[]> => request(`/todos?${params}`);
export const getUser = (id = 0): Promise<User> => request(`/users/${id}`);
