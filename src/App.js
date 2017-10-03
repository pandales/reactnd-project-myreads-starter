import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {

  state = {

  };
  shelves = [
    {
      code: 'currentlyReading',
      name: 'Currently Reading'
    },
    {
      code: 'wantToRead',
      name: 'Want to read'
    },
    {
      code: 'read',
      name: 'Read'
    }
    ];

  render() {

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks shelves={this.shelves} />
        )}/>

      </div>
    )
  }
}

export default BooksApp
