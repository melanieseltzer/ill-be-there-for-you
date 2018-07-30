const API = 'https://friends-quotes-api.herokuapp.com/quotes/random';

export default async () => {
  const response = await fetch(API);
  return response.json();
};
