import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {

    BooksAPI.getAll().then(books => {
      this.setState({books: books})
    });
  }

  // Utilities functions
  updateBookShelf(book, shelf) {

    let books = this.state.books.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }

      return b;
    });

    if(!book.shelf) {
      book.shelf = shelf;
      books.push(book)
    }

    this.setState({books: books});
    BooksAPI.update(book, shelf);
  }
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
          <SearchBooks
            updateBookShelf={this.updateBookShelf.bind(this)}
            books={this.state.books}
          />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks
            shelves={this.shelves}
            books={this.state.books}
            updateBookShelf={this.updateBookShelf.bind(this)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
