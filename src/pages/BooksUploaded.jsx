import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function BooksUploaded() {

  const getBooks = () =>{
    // fetch books from server and set them to state
    // Example:
    fetch('https://fwu-soe.onrender.com/book/getBook')
    .then(response => response.json())
    .then(data =>console.log(data))
   
    .catch(error => console.error('Error:', error));
  }

  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    getBooks();
  }, [])
  return (
   <>
    <Navbar/>
    <h1>Books Uploaded</h1>

    <Footer/>
   </>
  )
}

export default BooksUploaded