export const request = url => (
  fetch(url)
    .then(response => response.json())
    .catch(error => error)
);
