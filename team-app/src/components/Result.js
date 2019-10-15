import React, { useState } from 'react';
import { useSpring, animated, useTransition } from 'react-spring'

const Result = (props) => {
    let symbol = props.answer === true
        ? <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
            <polyline fill="none" stroke="#1d1d1d" stroke-width="1.1" points="4,10 8,15 17,4"></polyline>
        </svg>
        : <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close">
            <path fill="none" stroke="#1d1d1d" stroke-width="1.06" d="M16,16 L4,4"></path>
            <path fill="none" stroke="#1d1d1d" stroke-width="1.06" d="M16,4 L4,16"></path>
        </svg>

    let resultClass = props.answer ? 'answer-right' : 'answer-wrong';

    const fade = useSpring({ opacity: 1, from: { opacity: 0 } });


    return (
        <animated.div style={fade} className={resultClass}>
            {symbol}
        </animated.div>
    )
}

export default Result;