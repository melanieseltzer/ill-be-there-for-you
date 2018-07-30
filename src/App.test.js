import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

// Use mock API call
jest.mock('./services/getQuote');

describe('<App />', () => {
  it('fetches a quote from the api and renders on mount', done => {
    // Shallow render with mock quote
    const wrapper = shallow(<App />);

    // Set a timeout to make sure promise resolves itself
    setTimeout(() => {
      // Make sure wrapper updates itself
      wrapper.update();
      // Get the state from wrapper instance
      const state = wrapper.instance().state;

      // .quoteWrapper should only exist if there's no error
      expect(wrapper.find('.quoteWrapper').length).toEqual(1);

      // Check state matches our mock quote
      expect(state.data).toEqual({
        quote: 'An awesome quote',
        character: 'Mr Dude'
      });

      // Shouldn't be loading or error
      expect(state.isLoading).toEqual(false);
      expect(state.isError).toEqual(false);

      done();
    });
  });
});
