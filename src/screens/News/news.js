const url =
  "https://newsapi.org/v2/everything?q=carro&apiKey=cec00a3af80446c29f26d6718177cef0";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}