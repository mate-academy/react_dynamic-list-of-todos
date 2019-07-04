export const SORT_ORDER_TITLE = "title";
export const SORT_ORDER_COMPLETED = "completed";
export const SORT_ORDER_USER = "user";
export const SORT_ORDER_TITLE_BACK = "title_back";
export const SORT_ORDER_COMPLETED_BACK = "completed_back";
export const SORT_ORDER_USER_BACK = "user_back";

export const getToDosFromServer = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos").then(res =>
    res.json()
  );
};
export const getUsersFromServer = () => {
  return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
    res.json()
  );
};
