import React, { Component } from "react";
import { graphql } from "react-apollo";
// importing compose from lodash, has been removed from react-apollo
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

export class AddBook extends Component {
constructor(props){
    super(props)
    this.state = {
        name: '',
        genre: '',
        authorId: ''
    }
}
 displayAuthors(){
    var data = this.props.getAuthorsQuery;
    if(data.loading){
        return(<option>Loading authors...</option>)
    }else {
       return data.authors.map(author => {
           return (
               <option key={author.id} value={author.id}>{author.name}</option>
           )
       })
    }
 }

 submitForm(e){
    e.preventDefault()
    this.props.addBookMutation({
        // passing values in state to the addBookMutation varibales declared in queries.js
        variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId
        },
        // after running the addBookMutation this refetches any specified queries
        refetchQueries: [{query: getBooksQuery}]
    });
 }

  render() {
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book Name: </label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre: </label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="field">
          <label>Author: </label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}
// binding query to component (getBooksQuery)(BookList)
// export default graphql(getAuthorsQuery)(AddBook);
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),graphql(addBookMutation, {name: "addBookMutation"}))(AddBook);
