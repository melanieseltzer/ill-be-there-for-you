import React, { Component } from 'react';

const API = 'https://friends-quotes-api.herokuapp.com/quotes/random';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: false
    };
  }

  fetchQuote() {
    this.setState({ isLoading: true });

    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ data, isLoading: false }));
  }

  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    const { data } = this.state;

    return <p>{data.quote}</p>;
  }
}

export default App;
