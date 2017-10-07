import React from 'react'
import {BookShelf} from './components/BookShelf'
import {Link} from 'react-router-dom'

class ListBooks extends React.Component {

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
                books={this.props.books.filter(book => book.shelf === shelf.code)}
                // Uses bind to ensure that always this funcion will be called using the app as this
                updateBookShelf={this.props.updateBookShelf}
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