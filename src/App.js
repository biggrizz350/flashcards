import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  useEffect(() =>{
    axios
    .get('https://opentdb.com/api.php?amount=10')
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
      console.log(res.data)
    })
  },[])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }


  return (
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'Question 2',
    answer: 'Answer',
    options: [
      'Answer',
      'Answer 2',
      'Answer 3',
      'Answer 4'
    ]
  }
]

export default App;
