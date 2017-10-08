import React from 'react'

import PropTypes from 'prop-types'

const BookMenu = ({book, updateShelf}) => {

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || "none"}
              onChange={(event) => updateShelf(book, event.target.value)}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>

      </select>
    </div>
  );
};

BookMenu.propTypes = {
   book: PropTypes.object.isRequired,
   updateShelf: PropTypes.func.isRequired
 };


const Book = ({book, updateBookShelf}) => {

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}> </div>
          <BookMenu book={book} updateShelf={updateBookShelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired
};

const BookShelf = ({books, title, updateBookShelf}) =>{

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( (book, i) => (
              <li key={i}>
                <Book book={book} updateBookShelf={updateBookShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired
};
export  {
  BookShelf,
  Book
}