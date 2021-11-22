// The component for flash cards

import React, { useState, useEffect, useRef } from 'react'


export default function Flashcard({ flashcard }) { // the argument is being destructed as it comes in
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight(){ //This function will help set the card height
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect( setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]) // the height will recalulate anytime one of these change

    return (
        <div
        className={` card ${flip ? 'flip' : ''}`} // static class of card, utilizing the flip variable for tenerary operation
        onClick={()=> setFlip(!flip)}
        >
            <div className="front" useRef={frontEl}>
                {flashcard.question}
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option">{option}</div> //Loops through each option, option for each
                    })}
                </div>
            </div>
            <div className="back" useRef={backEl}>{flashcard.answer}</div>
        </div>
    )
}
