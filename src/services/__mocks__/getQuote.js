const fakeQuote = {
  quote: 'An awesome quote',
  character: 'Mr Dude'
};

export default async () => {
  // Return what the promise resolves
  return await new Promise(resolve => {
    // which is the fake quote
    resolve(fakeQuote);
  });
};
