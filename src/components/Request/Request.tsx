/* eslint-disable max-len */
export const Request = (point: string) => {
  return fetch(`https://mate-academy.github.io/react_dynamic-list-of-todos/api/${point}.json`)
    .then(response => response.json());
};
