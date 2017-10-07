import React from 'react'
import {Link} from 'react-router-dom'
import {Book} from './components/BookShelf'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends React.Component {

  state = {
    query: "",
    searchResults: [],
    books:[]
  };

  handleSearchInput = (event) => {
    this.setState({query: event.target.value});

    if(event.target.value === "") {
      this.setState({searchResults: []});
      return;
    }

     BooksAPI.search(event.target.value, 20)
      .then((response) => {
        let searchResult = response.map((resultBook) => {

          //If one  book is already in the shelf, add it instead of the result.
          const resultInShelf = this.props.books.filter( (myBook) => myBook.id === resultBook.id);
          if(resultInShelf.length) resultBook = resultInShelf[0];

          return resultBook;
        });

        this.setState({searchResults: searchResult.sort(sortBy('title'))});
      })
      .catch((e) => {
        this.setState({searchResults: []});
      })
  };

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
            {this.state.searchResults.map((book) => (
              <li key={book.id}>
                <Book book={book} updateBookShelf={this.props.updateBookShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks