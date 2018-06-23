import React from 'react'
import './App.css'
import BookShelfList from './BookShelfList'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI';
import { Link, Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {   
    books: [],
    searchResults:[]
  }
  
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }
  
  updateShelf = (newBook, shelf) => {
    const index = this.state.books.indexOf(newBook)
    const updatedBooks = [...this.state.books]

    if (shelf === 'none') {
      updatedBooks.splice(index, 1)
    } else if (!newBook.shelf) {
      const updatedBook = { ...newBook, shelf }
      updatedBooks.push(updatedBook)
    } else {
      const updatedBook = { ...newBook, shelf } 
      updatedBooks[index] = updatedBook 
    }

    BooksAPI.update(newBook, shelf).then(() => {
      this.setState({
          books: updatedBooks
      })
    })
  }
  
  updateQuery(query) {
    BooksAPI.search(query).then((APIsearchResults) => {
      if (query !== '' && APIsearchResults.error !== "empty query") {
        this.setState({ searchResults: APIsearchResults })
      }
      else
        this.setState({ searchResults: [] })
    })
  }
  
  getShelf = (book) => {
    const index = this.state.books.find((listed) => {
     if (listed.id === book.id) { return listed.shelf }
    })    
    return index ? index.shelf: 'none'
  }

  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelfList books = { this.state.books }
                updateShelf = { this.updateShelf }
                getShelf = { this.getShelf }
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" onClick={() => this.setState({ searchResults: [] })}>Add a book</Link>
            </div>
          </div>          
        )} />
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"className="close-search" onClick={() => this.setState({ searchResults:[] })}>Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <div className="bookshelf">
                <BookShelf
                  title = "Search Results"
                  books={ this.state.searchResults }
                  updateShelf = { this.updateShelf }
                  getShelf = { this.getShelf }
                /> 
              </div> 
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
