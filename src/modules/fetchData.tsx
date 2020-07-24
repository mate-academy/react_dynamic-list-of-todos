export async function fetchData<T>(urlUnit: string): Promise<T> {
  const URL = 'https://mate.academy/students-api/';
  const data = await fetch(`${URL}${urlUnit}`);
  const response = await data.json();

  return response.data;
}
