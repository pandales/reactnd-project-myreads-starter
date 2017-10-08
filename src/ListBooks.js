import React from 'react'
import {BookShelf} from './components/BookShelf'
import {Link} from 'react-router-dom'

const ListBooks = ({shelves, books, updateBookShelf}) => {

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf, key) => (
            <BookShelf
              key={key}
              title={shelf.name}
              books={books.filter(book => book.shelf === shelf.code)}
              // Uses bind to ensure that always this funcion will be called using the app as this
              updateBookShelf={updateBookShelf}
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
};

export default ListBooks