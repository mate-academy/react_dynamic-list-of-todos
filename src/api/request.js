const API_URL = `https://mate-api.herokuapp.com/`;

export const request = (url, options) => (
  fetch(`${API_URL}${url}`, options)
    .then((result) => {
      if (!result.ok) {
        throw new Error(`${result.status} - ${result.statusText}`);
      }

      return result.json();
    })
    .then(result => result.data)
);
