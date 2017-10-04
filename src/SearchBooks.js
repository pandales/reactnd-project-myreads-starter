import React from 'react'
import {Link} from 'react-router-dom'
import {Book} from './components/BookShelf'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {

  state = {
    query: "",
    books:[]
  };

  handleSearchInput = (event) => {
    this.setState({query: event.target.value});

    if(event.target.value === "") {
      this.setState({books: []});
      return;
    }

     BooksAPI.search(event.target.value, 20)
      .then((response) => {
        this.setState({books: response});
      })
      .catch((error) => {
        this.setState({books: []});
      })
  };

  // Utilities functions
  updateBookShelf(book, shelf) {
    let books = this.state.books.map(b => {
      if (b.id === book.id) b.shelf = shelf;

      return b;
    });

    this.setState({books: books});

    // Update the shelf only if the destination is valid
    shelf !== 'none' && BooksAPI.update(book, shelf);
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} onChange={this.handleSearchInput} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} updateBookShelf={this.updateBookShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks