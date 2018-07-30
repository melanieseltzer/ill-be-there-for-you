import React, { Component } from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Loader from 'react-loader-spinner';

import './App.css';
import Image from './friends.jpg';

const API = 'https://friends-quotes-api.herokuapp.com/quotes/random';

class App extends Component {
  constructor(props) {
    super(props);

    // Set default state for page load
    this.state = {
      data: {},
      isLoading: false,
      isError: false
    };
  }

  fetchQuote() {
    // Set loading to true to display loading spinner
    this.setState({ isLoading: true });

    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ isError: true, isLoading: false }));
  }

  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    const { data, isLoading, isError } = this.state;
    const loading = isLoading ? '...Loading' : 'Grab Another';
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
                <div>
                  <Heading size={4}>"{data.quote}"</Heading>
                  <Heading subtitle size={4} renderAs="h2">
                    {'- '}
                    {data.character}
                  </Heading>
                </div>
              )}
              <Button onClick={() => this.fetchQuote()} color="primary">
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
