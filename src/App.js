import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() =>{
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  useEffect(() =>{

  },[])

  function decodeString(str){ //this function converts the html symbols into regular text
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }


  function handleSubmit(e){
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php', {
      params: {
      amount: amountEl.current.value, // getting current value from page
      category: categoryEl.current.value // gets category from page
      }
    } )
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString( questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
           answer] // incorrect answers first, correct answer last
        return{
          id: `${index}-${Date.now()}`, //dynamically sets the id, also appends the date onto the ID
          question: decodeString( questionItem.question),  //has to match the keys from the JSON string
          answer: answer,
          options: options.sort(() => Math.random() - 0.5) // positive number 50% of the time, negative the other 50%

        }
      }))
    })
  }

  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Catagory</label>
        <select id="category" ref={categoryEl}> 
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option> //sets and populates the category
          })} 
        </select>
      </div>
      <div className="form-group">
      <label htmlFor="amount">Number of Questions</label>
      <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl}/>
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>
    </form>
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
    </>
  );
}




export default App;
