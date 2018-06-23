import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
    getShelf: PropTypes.func.isRequired   
  }
  
  state = {
    shelf: ''
  }
  
  componentDidMount(){
    this.setState({shelf: this.props.books.shelf ? this.props.books.shelf : 'none'})
  }
  
  handleChange = (event) => {
    this.props.updateShelf(this.props.books, event.target.value)
    this.setState({shelf: event.target.value})
  }
  

  
  render() {
    const { books } = this.props

    return (
        <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ 
                backgroundImage: "url(" + (books.imageLinks ? books.imageLinks.thumbnail + ")" : "'')")
                }}>
                </div>
                <div className="book-shelf-changer">
                  <select defaultValue= { this.props.getShelf(books) } onChange={ this.handleChange }>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{books.title}</div>
              <div className="book-authors">
                {books.authors && books.authors.map((author) => {
                    return (<div key={author}>{author}</div>)
                })}
              </div>
            </div> 
        </li>
    )
  }
}

export default Book
