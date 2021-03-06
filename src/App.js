// @flow

import React, { Component } from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Loader from 'react-loader-spinner';

import './App.css';
import Image from './friends.jpg';
import getQuote from './services/getQuote';

type State = {
  data: Object,
  isLoading: boolean,
  isError: boolean
};

class App extends Component<any, State> {
  constructor() {
    super();

    // Set default state for page load
    this.state = {
      data: {},
      isLoading: false,
      isError: false
    };
  }

  async loadQuote() {
    // Set loading to true to display loading spinner
    this.setState({ isLoading: true });

    try {
      // Get resolved promise data
      const data = await getQuote();
      this.setState({
        data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isError: true,
        isLoading: false
      });
    }
  }

  componentDidMount() {
    // Display a quote on page load by default
    this.loadQuote();
  }

  render() {
    const { data, isLoading, isError } = this.state;
    const loading = isLoading ? 'Loading...' : 'Grab Another';
    const error = isError ? <p>Something went wrong :(</p> : '';

    return (
      <Hero color="primary" size="fullheight">
        <Hero.Body>
          <Container>
            <div className="card">
              <img src={Image} alt="Friends" />
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#363636"
                  height={50}
                  width={50}
                />
              ) : isError ? (
                error
              ) : (
                <div className="quoteWrapper">
                  <Heading size={4}>"{data.quote}"</Heading>
                  <Heading subtitle size={4} renderAs="h2">
                    {'- '}
                    {data.character}
                  </Heading>
                </div>
              )}
              <Button outlined onClick={() => this.loadQuote()} color="danger">
                {loading}
              </Button>
            </div>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
}

export default App;
