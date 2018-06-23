import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired,
    getShelf: PropTypes.func.isRequired    
  }
  
  render() {
    return (
      <div>
        { this.props.title &&
        <div className="bookshelf-title">
          {this.props.title}
        </div>
        }
        <ol className="books-grid">          
            {this.props.books.length > 0 && this.props.books.map(( vols ) =>  {
              return  (
                <div className="book" key={ vols.title }>
                    <Book books={ vols }
                    updateShelf = { this.props.updateShelf }
                    getShelf = { this.props.getShelf }
                    />
                </div> )
            })}
        </ol>
      </div>
    )
  }
}

export default BookShelf
