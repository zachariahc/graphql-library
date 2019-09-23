import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`
const getBookQuery = gql`
query($id: ID){
  book(id: $id){
    id
    name
    genre
    author{
      id
      name
      age
      books{
        name
        id
      }
    }
  }
}
`
// passing varibales to addBookMutation
// authordId as ID threw error. Reverted to string
const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: String!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        id
    } 
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery }