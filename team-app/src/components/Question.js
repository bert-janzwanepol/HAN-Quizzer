import React, { useState } from 'react';

const Question = (props) => {

    const [answer, setAnswer] = useState("");

    return (
        <>
            <h2 className="center">{props.question}</h2>
            <form>
                <input value={answer} onChange={e => setAnswer(e.target.value)} type="text" name="answer" required />
                <button type="submit">submit answer</button>
            </form>
        </>
    )
}

export default Question;