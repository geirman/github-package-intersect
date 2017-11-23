import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


class App extends Component {

  state = {
    pkg1: 'react-native',
    pkg2: 'graphql',
    resultSet: []
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    });
  }

  handleSearch = (evt) => {
    evt.preventDefault();
    const url = `https://api.github.com/search/code?q=${this.state.pkg1}+in:file+filename:package.json+${this.state.pkg2}+in:file+filename:package.json`;
    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(process.env.REACT_APP_CREDENTIALS)}`);

    fetch(url, {
      method: 'GET',
      headers
    })
    .then(response => response.json())
    .then(result => {
      console.log({result});
      this.setState({resultSet: result.items});
    })
    .catch(error => console.log({error}))
  }

  getSearchResults = (results) => {
    if(!this.state.resultSet.length) return null;

    const listitems = this.state.resultSet.reduce((acc, item) => {
      return acc.concat({
        url: item.html_url,
        repo: item.repository.name,
        login: item.repository.owner.login
      });
    }, [])
    .map(item => `<li><a target='_new' href='${item.url}'>${item.login}/${item.repo}</a></li>`)
    .join('');

    return <ol dangerouslySetInnerHTML={{ __html: listitems}}></ol>;
  }

  render() {
    const searchResults = this.getSearchResults(this.state.resultSet);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Github Search
          </h1>
        </header>
        <section title="main-body">
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Package 1</ControlLabel>
            <FormControl
              name="pkg1"
              type="text"
              bsSize="small"
              value={this.state.pkg1}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <ControlLabel>Package 2</ControlLabel>
            <FormControl
              name="pkg2"
              type="text"
              value={this.state.pkg2}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <Button type="submit" onClick={this.handleSearch}>
              Search
            </Button>
          </FormGroup>
        </section>
        {searchResults}
      </div>
    );
  }
}

export default App;
