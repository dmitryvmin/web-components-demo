async function useFetch(input, init) {
  try {
    const response = await fetch(input, init);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(`Error fetching request ${input}:`, err);
    return undefined;
  }
}

export default useFetch;
