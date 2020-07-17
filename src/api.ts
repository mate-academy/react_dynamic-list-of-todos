const getData = (url: string): Promise<[]> => {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data);
};

export default getData;
