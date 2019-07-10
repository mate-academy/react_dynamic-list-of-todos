const getData = async(props) => {
  const response = await fetch(props);
  const data = await response.json();
  return data;
};
export default getData;
