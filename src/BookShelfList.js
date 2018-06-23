import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookShelfList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    getShelf: PropTypes.func.isRequired
  }
  
  render() {
     const shelves = [
        { categories: 'currentlyReading', title: 'Currently Reading' },
        { categories: 'wantToRead',  title: 'Want to Read' },
        { categories: 'read', title: 'Read'}
     ]        
    
    return (
      <div>     
        <div className="book-shelf-list">                
            {shelves.map(( shelf ) =>  {
              const shelfBooks = this.props.books.filter( (book) => book.shelf === shelf.categories)
              return  (
                <div className="bookshelf" key={ shelf.title }>
                    <BookShelf
                      title = { shelf.title }
                      books={ shelfBooks }
                      updateShelf = { this.props.updateShelf }
                      getShelf = { this.props.getShelf }
                    /> 
                </div> 
              )
            })}
        </div>
      </div>
    )
  }
}

export default BookShelfList
