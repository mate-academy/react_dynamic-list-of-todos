const baseUrl = 'https://mate.academy/students-api/';

export const getData = (urlEnding: string) => {
  return fetch(`${baseUrl}${urlEnding}`)
    .then(response => response.json());
};
