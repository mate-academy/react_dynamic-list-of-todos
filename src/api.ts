const link = 'https://mate.academy/students-api';

const getData = (endpoint: string) => {
  return fetch(`${link}${endpoint}`)
    .then(res => res.json());
};

export default getData;
