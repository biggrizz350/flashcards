// The component for flash cards

import React, { useState } from 'react'


export default function Flashcard({ flashcard }) { // the argument is being destructed as it comes in
    const [flip, setFlip] = useState(false)
    return (
        <div
        className={`card ${flip ? 'flip' : ''}`} // static class of card, utilizing the flip variable for tenerary operation
        onClick={()=> setFlip(!flip)}
        >
            <div className="front">
                {flashcard.question}
                <div className='flashcard-options'>
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option">{option}</div> //Loops through each option, option for each
                    })}
                </div>
            </div>
            <div className="back">{flashcard.answer}</div>
        </div>
    )
}
