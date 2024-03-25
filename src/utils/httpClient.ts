import { BASE_URL } from './baseUrl';

export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
