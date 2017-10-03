import React from 'react'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class ListBooks extends React.Component {
  state = {
    books: [],

    shelves: [
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
    ]
  };

  componentDidMount() {

    BooksAPI.getAll().then(books => {
      this.setState({books: books})
    });
  }

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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelves.map((shelf, key) => (
              <BookShelf
                key={key}
                title={shelf.name}
                books={this.state.books.filter(book => book.shelf === shelf.code)}
                // Uses bind to ensure that always this funcion will be called using the app as this
                updateBookShelf={this.updateBookShelf.bind(this)}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search">
            Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks